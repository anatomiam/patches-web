import React from "react";
import { Button } from "semantic-ui-react";

export const UpdateCxButton = React.memo(({ knobId, cx, dispatch }) => {
  return (
    <Button
      icon="resize horizontal"
      size="mini"
      className="icon-pointer"
      color="blue"
      onClick={event => {
        event.preventDefault();
        dispatch({
          type: "UPDATE_CX",
          selectedComponentId: knobId,
          cx
        });
      }}
    />
  );
});
