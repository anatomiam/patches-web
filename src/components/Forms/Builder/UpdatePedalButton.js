import React from "react";
import { gql } from "apollo-boost";
import { useMutation } from "@apollo/react-hooks";
import { Button, Form } from "semantic-ui-react";
import { PropTypes } from "prop-types";
import {
  knobsToCreateModel,
  knobsToDeleteModel,
  knobsToUpdateModel,
  getNewKnobs,
  getDeletedKnobs,
  getUpdatedKnobs,
  restructureUpdatedKnobs,
  pickKeysFromArray
} from "../../../helpers/Helpers";

const UPDATE_PEDAL = gql`
  mutation UpdatePedal(
    $id: ID!
    $name: String
    $width: Float!
    $height: Float!
    $color: String
    $knobsToCreate: [KnobsInput]
    $knobsToDelete: [UpdateKnobsInput]
    $knobsToUpdate: [UpdateKnobsInput]
  ) {
    updatePedal(
      id: $id
      name: $name
      width: $width
      height: $height
      color: $color
      knobsToCreate: $knobsToCreate
      knobsToDelete: $knobsToDelete
      knobsToUpdate: $knobsToUpdate
    ) {
      id
    }
  }
`;

export const UpdatePedalButton = React.memo(({ localState }) => {
  const { knobs, originalKnobs, pedalDetails } = localState;
  const { name, width, height, color, id } = pedalDetails;
  const [updatePedal] = useMutation(UPDATE_PEDAL);

  const knobsToCreate = pickKeysFromArray(
    getNewKnobs(originalKnobs, knobs),
    knobsToCreateModel
  );
  const knobsToDelete = pickKeysFromArray(
    getDeletedKnobs(originalKnobs, knobs),
    knobsToDeleteModel
  );
  const knobsToUpdate = restructureUpdatedKnobs(
    getUpdatedKnobs(originalKnobs, knobs),
    knobsToUpdateModel
  );

  return (
    <Form>
      <Button
        onClick={event => {
          event.preventDefault();
          updatePedal({
            variables: {
              id,
              name,
              width,
              height,
              color,
              knobsToCreate,
              knobsToDelete,
              knobsToUpdate
            }
          });
        }}
      >
        Update Pedal
      </Button>
    </Form>
  );
});

UpdatePedalButton.propTypes = { localState: PropTypes.object };
