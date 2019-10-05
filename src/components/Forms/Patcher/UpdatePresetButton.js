import React from "react";
import { gql } from "apollo-boost";
import { useMutation } from "@apollo/react-hooks";
import { Button, Form } from "semantic-ui-react";
import { PropTypes } from "prop-types";
import { restructureUpdatedPatches } from "../../../helpers/Helpers";

const UPDATE_PRESET = gql`
  mutation UpdatePreset(
    $id: ID!
    $name: String
    $description: String
    $patchesToUpdate: [UpdatePatchesInput]
  ) {
    updatePreset(
      id: $id
      name: $name
      description: $description
      patchesToUpdate: $patchesToUpdate
    ) {
      id
    }
  }
`;

export const UpdatePresetButton = React.memo(({ localState }) => {
  const { knobs, patchDetails } = localState;
  const { patchNotes, knobNotes } = patchDetails;
  const { description, name, id } = patchNotes;

  const [updatePreset] = useMutation(UPDATE_PRESET);

  const patchesToUpdate = restructureUpdatedPatches(knobs, knobNotes);

  return (
    <Form>
      <Button
        onClick={event => {
          event.preventDefault();
          updatePreset({
            variables: {
              id,
              name,
              description,
              patchesToUpdate
            }
          });
        }}
      >
        Update Preset
      </Button>
    </Form>
  );
});

UpdatePresetButton.propTypes = { localState: PropTypes.object };
