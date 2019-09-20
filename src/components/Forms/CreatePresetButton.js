import React from "react";
import { gql } from "apollo-boost";
import { useMutation } from "@apollo/react-hooks";
import { Button, Form } from "semantic-ui-react";
import { map, pick, keys, filter } from "lodash";

const patchesModel = {
  id: null,
  angle: null
};

const CREATE_PRESET = gql`
  mutation CreatePreset(
    $user: ID!
    $pedal: ID
    $name: String!
    $description: String!
    $patches: [PatchesInput]
  ) {
    createPreset(
      user: $user
      pedal: $pedal
      name: $name
      description: $description
      patches: $patches
    ) {
      id
    }
  }
`;

export const CreatePresetButton = React.memo(({ localState }) => {
  const { builder, knobs, pedalDetails, patchDetails } = localState;
  const [createPreset] = useMutation(CREATE_PRESET);

  // grab only id and angle from knobs,
  // remove anything that doesn't have an angle set
  // change 'id' key to 'knob' to fit patch model
  // TODO put in reducer?
  const patchesToCreate = map(
    filter(
      map(knobs, knob => {
        return pick(knob, keys(patchesModel));
      }),
      knob => knob.angle !== null
    ),
    patch => {
      return {
        knob: patch.id,
        angle: patch.angle
      };
    }
  );

  return (
    <Form>
      <Button
        onClick={event => {
          event.preventDefault();
          createPreset({
            variables: {
              user: builder,
              pedal: pedalDetails.id,
              name: patchDetails.name,
              description: patchDetails.description,
              patches: patchesToCreate
            }
          });
        }}
      >
        Save Preset
      </Button>
    </Form>
  );
});
