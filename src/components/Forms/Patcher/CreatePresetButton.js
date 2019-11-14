import React from "react";
import { gql } from "apollo-boost";
import { useMutation } from "@apollo/react-hooks";
import { Button, Form } from "semantic-ui-react";
import { getPatchesToCreate } from "../../../helpers/Helpers";
import { PropTypes } from "prop-types";

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

export const CreatePresetButton = React.memo(({ patcherState }) => {
  const { builder, knobs, pedalDetails, patchDetails } = patcherState;
  const { patchNotes, knobNotes } = patchDetails;
  const [createPreset] = useMutation(CREATE_PRESET);
  const patchesToCreate = getPatchesToCreate(knobs, knobNotes);

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

CreatePresetButton.propTypes = { patcherState: PropTypes.object };
