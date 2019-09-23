import React from "react";
import { Button } from "semantic-ui-react";

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
