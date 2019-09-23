import React from "react";
import { Message } from "semantic-ui-react";
import { map, uniqueId } from "lodash";

export const ValidationErrors = React.memo(({ errors }) => {
  return (
    <Message color="yellow">
      <Message.List>
        {map(errors, (value, key) => {
          return <Message.Item key={uniqueId("validation-errors-key-")}>{value}</Message.Item>;
        })}
      </Message.List>
    </Message>
  );
});
