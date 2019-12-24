import { Button } from "semantic-ui-react";
import { PropTypes } from "prop-types";
import React from "react";

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
DeleteSelectedKnobButton.displayName = "DeleteSelectedKnobButton";
