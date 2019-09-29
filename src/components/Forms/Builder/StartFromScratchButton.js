import React from "react";
import { Button, Form } from "semantic-ui-react";
import { PropTypes } from "prop-types";

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

StartFromScratchButton.propTypes = {
  dispatch: PropTypes.func
};
