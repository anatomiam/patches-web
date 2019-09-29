import React from "react";
import { Button } from "semantic-ui-react";
import { PropTypes } from "prop-types";

export const DragKnobButton = React.memo(({ drag, dispatch }) => {
  return (
    <Button
      icon={drag ? "hand rock" : "hand paper"}
      className="icon-pointer"
      color={drag ? "orange" : "blue"}
      onClick={event => {
        event.preventDefault();
        dispatch({
          type: "DRAG_KNOB"
        });
      }}
    />
  );
});

DragKnobButton.propTypes = {
  drag: PropTypes.bool,
  dispatch: PropTypes.func
};
