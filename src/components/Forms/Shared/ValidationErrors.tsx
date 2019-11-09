import React from "react";
import { Message } from "semantic-ui-react";
import { map, uniqueId } from "lodash";
import { FormikErrors } from "formik";
// import { PropTypes } from "prop-types";

export const ValidationErrors: React.FC<{
  errors: FormikErrors<{}>;
}> = React.memo(({ errors }) => {
  return (
    <Message color="yellow">
      <Message.List>
        {map(errors, (value, key) => {
          return (
            <Message.Item key={uniqueId("validation-errors-key-")}>
              {value}
            </Message.Item>
          );
        })}
      </Message.List>
    </Message>
  );
});

// ValidationErrors.propTypes = { errors: PropTypes.object };
