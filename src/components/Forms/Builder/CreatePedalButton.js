import { Button, Form } from "semantic-ui-react";
import {
  knobsToCreateModel,
  pickKeysFromArray
} from "../../../helpers/Helpers";

import { PropTypes } from "prop-types";
import React from "react";
import { gql } from "apollo-boost";
import { useMutation } from "@apollo/react-hooks";

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

export const CreatePedalButton = React.memo(({ builderState, buttonProps }) => {
  const { knobs, builder } = builderState;
  const { name, width, height, color } = builderState.pedalDetails;
  const [createPedal] = useMutation(CREATE_PEDAL);
  const knobsToCreate = pickKeysFromArray(knobs, knobsToCreateModel);

  return (
    <Form>
      <Button
        {...buttonProps}
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
      />
    </Form>
  );
});

CreatePedalButton.propTypes = {
  builderState: PropTypes.object,
  buttonProps: PropTypes.object
};
CreatePedalButton.displayName = "CreatePedalButton";
