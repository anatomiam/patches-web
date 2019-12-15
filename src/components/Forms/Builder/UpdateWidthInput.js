import React from "react";
import { Button, Input, Form } from "semantic-ui-react";
import { ValidationErrors } from "../Shared/ValidationErrors";
import { Formik } from "formik";
import * as Yup from "yup";
import { isEmpty } from "lodash";
import { PropTypes } from "prop-types";

const UpdateWidthInputSchema = Yup.object().shape({
  width: Yup.number()
    .min(0, "Width cannot be a negative number")
    .max(750, "Width cannot be greater than 750 pixels")
    .required("Width is required")
});

export const UpdateWidthInput = React.memo(({ knobId, width, updateWidth }) => {
  return (
    <Formik
      enableReinitialize
      initialValues={{ width }}
      validationSchema={UpdateWidthInputSchema}
      validateOnChange={false}
      validateOnBlur={false}
      onSubmit={(values, { setSubmitting }) => {
        setSubmitting(false);
        updateWidth(knobId, values.width);
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
              id="width"
              placeholder="Update width"
              name="width"
              type="number"
              value={values.width}
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

UpdateWidthInput.propTypes = {
  knobId: PropTypes.string,
  width: PropTypes.number,
  dispatch: PropTypes.func
};
