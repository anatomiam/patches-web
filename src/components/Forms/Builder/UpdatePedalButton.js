import { Button, Form } from "semantic-ui-react";
import {
  getDeletedKnobs,
  getNewKnobs,
  getUpdatedKnobs,
  knobsToCreateModel,
  knobsToDeleteModel,
  knobsToUpdateModel,
  pickKeysFromArray,
  restructureUpdatedKnobs
} from "../../../helpers/Helpers";

import { PropTypes } from "prop-types";
import React from "react";
import { gql } from "apollo-boost";
import { useMutation } from "@apollo/react-hooks";

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

export const UpdatePedalButton = React.memo(
  ({ builderState, setOriginalKnobs }) => {
    const { knobs, originalKnobs, pedalDetails } = builderState;
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
          size="mini"
          color="green"
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
            setOriginalKnobs();
          }}
        >
          Update Pedal
        </Button>
      </Form>
    );
  }
);

UpdatePedalButton.propTypes = {
  builderState: PropTypes.object,
  setOriginalKnobs: PropTypes.func
};
UpdatePedalButton.displayName = "UpdatePedalButton";
