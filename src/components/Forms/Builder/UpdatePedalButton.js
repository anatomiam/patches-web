import React from "react";
import { gql } from "apollo-boost";
import { useMutation } from "@apollo/react-hooks";
import { Button, Form } from "semantic-ui-react";
import {
  knobsToCreateModel,
  knobsToUpdateModel,
  getNewKnobs,
  getDeletedKnobs,
  getUpdatedKnobs,
  restructureUpdatedKnobs,
  restructureKnobsToCreate,
  restructureDeletedKnobs
} from "../../../state/helpers";

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

  const knobsToCreate = restructureKnobsToCreate(
    getNewKnobs(originalKnobs, knobs),
    knobsToCreateModel
  );
  const knobsToDelete = restructureDeletedKnobs(
    getDeletedKnobs(originalKnobs, knobs)
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
