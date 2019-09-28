import React from "react";
import { gql } from "apollo-boost";
import { useMutation } from "@apollo/react-hooks";
import { Button, Form } from "semantic-ui-react";
import { map, pick, keys, filter } from "lodash";

const patchesModel = {
  id: null,
  angle: null,
  notes: null
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
  const { patchNotes, knobNotes } = patchDetails;
  const [createPreset] = useMutation(CREATE_PRESET);

  // TODO clean this up
  // grab only id and angle from knobs,
  const pickedKnobs = map(knobs, knob => {
    return pick(knob, keys(patchesModel));
  });
  // remove anything that doesn't have an angle set
  // const filteredKnobs = filter(pickedKnobs, knob => knob.angle !== null);
  const filteredKnobs = pickedKnobs;
  // Add knob notes
  const addedKnobNotes = map(filteredKnobs, knob => {
    return {
      notes: pick(knobNotes, [knob.id])[knob.id],
      ...knob
    };
  });

  // change 'id' key to 'knob' to fit patch model
  const patchesToCreate = map(addedKnobNotes, patch => {
    return {
      knob: patch.id,
      angle: patch.angle,
      notes: patch.notes
    };
  });

  return (
    <Form>
      <Button
        onClick={event => {
          event.preventDefault();
          createPreset({
            variables: {
              user: builder,
              pedal: pedalDetails.id,
              name: patchNotes.name,
              description: patchNotes.description,
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
