import React from "react";
import { gql } from "apollo-boost";
import { useMutation } from "@apollo/react-hooks";
import { Button, Form } from "semantic-ui-react";
import { PropTypes } from "prop-types";
import {
  knobsToCreateModel,
  pickKeysFromArray
} from "../../../helpers/Helpers";

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

export const CreatePedalButton = React.memo(({ builderState }) => {
  const { knobs, builder } = builderState;
  const { name, width, height, color } = builderState.pedalDetails;
  const [createPedal] = useMutation(CREATE_PEDAL);
  const knobsToCreate = pickKeysFromArray(knobs, knobsToCreateModel);

  return (
    <Form>
      <Button
        size="mini"
        color="green"
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

CreatePedalButton.propTypes = {
  builderState: PropTypes.object
};
CreatePedalButton.displayName = "CreatePedalButton";
