import React from "react";
import { gql } from "apollo-boost";
import { useMutation } from "@apollo/react-hooks";
import { Button, Form } from "semantic-ui-react";
import {
  knobsToCreateModel,
  restructureKnobsToCreate
} from "../../state/helpers";

const CREATE_PEDAL = gql`
  mutation CreatePedal(
    $name: String!
    $builder: ID!
    $width: Float
    $height: Float
    $color: String!
    $knobs: [KnobsInput]
  ) {
    createPedal(
      name: $name
      builder: $builder
      width: $width
      height: $height
      color: $color
      knobs: $knobs
    ) {
      id
    }
  }
`;

export const CreatePedalButton = React.memo(({ localState }) => {
  const { knobs, builder } = localState;
  const { name, width, height, color } = localState.pedalDetails;
  const [createPedal] = useMutation(CREATE_PEDAL);
  const knobsToCreate = restructureKnobsToCreate(knobs, knobsToCreateModel);

  return (
    <Form>
      <Button
        onClick={event => {
          event.preventDefault();
          createPedal({
            variables: {
              name,
              builder,
              width,
              height,
              color,
              knobs: knobsToCreate
            }
          });
        }}
      >
        Save Pedal
      </Button>
    </Form>
  );
});
