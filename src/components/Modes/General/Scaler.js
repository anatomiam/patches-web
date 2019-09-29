import React from "react";
import { Button } from "semantic-ui-react";
import { PropTypes } from "prop-types";

export const Scaler = React.memo(({ scale, dispatch }) => {
  return (
    <div>
      <Button
        icon="minus"
        onClick={() => dispatch({ type: "SET_SCALE", scale: scale * 0.9 })}
      />
      <span style={{ padding: "3px" }}>
        {parseFloat(scale * 100).toFixed(0) + "%"}
      </span>
      <Button
        icon="plus"
        onClick={() => dispatch({ type: "SET_SCALE", scale: scale * 1.1 })}
      />
    </div>
  );
});

Scaler.propTypes = { scale: PropTypes.number, dispatch: PropTypes.func };
