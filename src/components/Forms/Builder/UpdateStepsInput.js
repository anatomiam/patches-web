import * as Yup from "yup";

import { Button, Form, Input } from "semantic-ui-react";

import { Formik } from "formik";
import { PropTypes } from "prop-types";
import React from "react";
import { ValidationErrors } from "../Shared/ValidationErrors";
import { isEmpty } from "lodash";

const UpdateStepsInputSchema = Yup.object().shape({
  steps: Yup.number()
    .min(0, "Steps cannot be a negative number")
    .max(750, "Steps cannot be greater than 750 pixels")
    .required("Steps is required")
});

export const UpdateStepsInput = React.memo(({ knobId, steps, updateSteps }) => {
  return (
    <Formik
      enableReinitialize
      initialValues={{ steps }}
      validationSchema={UpdateStepsInputSchema}
      validateOnChange={false}
      validateOnBlur={false}
      onSubmit={(values, { setSubmitting }) => {
        setSubmitting(false);
        updateSteps(knobId, values.steps);
      }}
    >
      {({ values, errors, handleChange, isSubmitting, handleSubmit }) => (
        <Form
          onSubmit={event => {
            event.preventDefault();
            handleSubmit();
          }}
        >
          <Form.Field>
            <Input
              size="mini"
              id="steps"
              placeholder="Update steps"
              name="steps"
              type="number"
              value={values.steps}
              onChange={handleChange}
              action={
                <Button
                  icon="resize horizontal"
                  size="mini"
                  color="blue"
                  className="icon-pointer"
                  type="submit"
                  disabled={isSubmitting}
                />
              }
            />
          </Form.Field>
          {!isEmpty(errors) ? <ValidationErrors errors={errors} /> : null}
        </Form>
      )}
    </Formik>
  );
});

UpdateStepsInput.propTypes = {
  knobId: PropTypes.string,
  steps: PropTypes.number,
  dispatch: PropTypes.func,
  updateSteps: PropTypes.func
};
UpdateStepsInput.displayName = "UpdateStepsInput";
