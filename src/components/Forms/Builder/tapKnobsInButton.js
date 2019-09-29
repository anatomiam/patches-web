import React from "react";
import { Button } from "semantic-ui-react";
import { PropTypes } from "prop-types";

export const TapKnobsInButton = React.memo(({ tapKnobsIn, dispatch }) => {
  return (
    <Button
      icon={tapKnobsIn ? "add circle" : "times circle"}
      className="icon-pointer"
      color={tapKnobsIn ? "yellow" : "purple"}
      onClick={event => {
        event.preventDefault();
        dispatch({
          type: "TAP_KNOB"
        });
      }}
    />
  );
});

TapKnobsInButton.propTypes = {
  tapKnobsIn: PropTypes.bool,
  dispatch: PropTypes.func
};
