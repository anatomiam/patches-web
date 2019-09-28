import React from "react";
import { Button, Form } from "semantic-ui-react";

export const StartFromScratchButton = React.memo(({ dispatch }) => {
  return (
    <Form>
      <Button
        onClick={event => {
          event.preventDefault();
          dispatch({
            type: "START_FROM_SCRATCH"
          });
        }}
      >
        Start From Scratch
      </Button>
    </Form>
  );
});
