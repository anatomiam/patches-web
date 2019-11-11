import React from "react";
import { Button } from "semantic-ui-react";
import { PropTypes } from "prop-types";

export const DeleteSelectedKnobButton = React.memo(({ knobId, deleteKnob }) => {
  return (
    <Button
      content="Delete Knob"
      size="mini"
      className="icon-pointer"
      color="red"
      fluid
      onClick={event => {
        event.preventDefault();
        deleteKnob(knobId);
      }}
    />
  );
});

DeleteSelectedKnobButton.propTypes = {
  knobId: PropTypes.string,
  deleteKnob: PropTypes.func
};
