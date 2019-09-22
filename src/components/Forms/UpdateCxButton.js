import React, { useState } from "react";
import { Button, Input } from "semantic-ui-react";

export const UpdateCxButton = React.memo(({ knobId, cx, dispatch }) => {
  const [updatedCx, setUpdatedCx] = useState(cx);

  return (
    <Input
      size="mini"
      type="number"
      placeholder="Update cx"
      onChange={event => {
        setUpdatedCx(event.target.value);
      }}
      value={updatedCx}
      action={
        <Button
          icon="add"
          size="mini"
          className="icon-pointer"
          onClick={event => {
            event.preventDefault();
            console.log(updatedCx);
            dispatch({
              type: "UPDATE_CX",
              selectedComponentId: knobId,
              cx: updatedCx
            });
          }}
        />
      }
    />
  );
});
