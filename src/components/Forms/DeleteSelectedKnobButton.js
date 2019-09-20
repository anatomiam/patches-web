import React from "react";
import { Button, Form } from "semantic-ui-react";

export const DeleteSelectedKnobButton = React.memo(
  ({ localState, dispatch }) => {
    const { selectedComponentId } = localState;

    return (
      <Form>
        <Button
          onClick={event => {
            event.preventDefault();
            dispatch({
              type: "DELETE_KNOB",
              selectedComponentId
            });
          }}
        >
          Delete Selected Knob
        </Button>
      </Form>
    );
  }
);
