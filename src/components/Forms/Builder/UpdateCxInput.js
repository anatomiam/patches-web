import * as Yup from "yup";

import { Button, Form, Input } from "semantic-ui-react";

import { Formik } from "formik";
import { PropTypes } from "prop-types";
import React from "react";
import { ValidationErrors } from "../Shared/ValidationErrors";
import { isEmpty } from "lodash";

const UpdateCxInputSchema = Yup.object().shape({
  cx: Yup.number()
    .min(0, "Center X cannot be a negative number")
    .max(750, "Center X cannot be greater than 750 pixels")
    .required("Center X is required")
});

export const UpdateCxInput = React.memo(({ knobId, cx, updateCx }) => {
  return (
    <Formik
      enableReinitialize
      initialValues={{ cx }}
      validationSchema={UpdateCxInputSchema}
      validateOnChange={false}
      validateOnBlur={false}
      onSubmit={(values, { setSubmitting }) => {
        setSubmitting(false);
        updateCx(knobId, values.cx);
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
              id="cx"
              placeholder="Update cx"
              name="cx"
              type="number"
              value={values.cx}
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

UpdateCxInput.propTypes = {
  knobId: PropTypes.string,
  cx: PropTypes.number,
  dispatch: PropTypes.func,
  updateCx: PropTypes.func
};
UpdateCxInput.displayName = "UpdateCxInput";
