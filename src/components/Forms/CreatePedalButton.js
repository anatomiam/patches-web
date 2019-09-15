import React from "react";
import gql from "graphql-tag";
import { useMutation } from "react-apollo-hooks";
import { Button, Form } from "semantic-ui-react";
import { map, pick, keys } from "lodash";

const knobsModel = {
  type: null,
  description: null,
  color: null,
  cx: null,
  cy: null,
  r: null,
  angle: null,
  width: null
};

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
  const createPedal = useMutation(CREATE_PEDAL);
  const knobsToCreate = map(knobs, knob => {
    // return object of shape 'knobsModel'
    return pick(knob, keys(knobsModel));
  });

  return (
    <>
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
    </>
  );
});
