import React from "react";
import { Button } from "semantic-ui-react";
import { PropTypes } from "prop-types";

export const DeleteSelectedKnobButton = React.memo(({ knobId, dispatch }) => {
  return (
    <Button
      content="Delete Knob"
      size="mini"
      className="icon-pointer"
      color="red"
      fluid
      onClick={event => {
        event.preventDefault();
        dispatch({
          type: "DELETE_KNOB",
          selectedComponentId: knobId
        });
      }}
    />
  );
});

DeleteSelectedKnobButton.propTypes = {
  knobId: PropTypes.string,
  dispatch: PropTypes.func
};
