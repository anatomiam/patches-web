import React from "react";
import { gql } from "apollo-boost";
import { useMutation } from "@apollo/react-hooks";
import { Button, Form } from "semantic-ui-react";
import { PropTypes } from "prop-types";
import {
  patchesToUpdateModel,
  getUpdatedKnobs,
  restructureUpdatedKnobs
} from "../../../helpers/Helpers";

const UPDATE_PRESET = gql`
  mutation UpdatePreset(
    $id: ID!
    $name: String
    $description: String
    $patchesToUpdate: [UpdatePatchesInput]
  ) {
    updatePedal(
      id: $id
      name: $name
      desctiption: $description
      patchesToUpdate: $patchesToUpdate
    ) {
      id
    }
  }
`;

export const UpdatePresetButton = React.memo(({ localState }) => {
  const { patches, originalPatches, presetDetails } = localState;
  const { name, description, id } = presetDetails;
  const [updatePreset] = useMutation(UPDATE_PRESET);

  const patchesToUpdate = restructureUpdatedKnobs(
    getUpdatedKnobs(originalPatches, patches),
    patchesToUpdateModel
  );

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
