import React from "react";
import { Button, Input, Form } from "semantic-ui-react";
import { ValidationErrors } from "../Shared/ValidationErrors";
import { Formik } from "formik";
import * as Yup from "yup";
import { isEmpty } from "lodash";
import { PropTypes } from "prop-types";

const UpdateRInputSchema = Yup.object().shape({
  r: Yup.number()
    .min(0, "R cannot be a negative number")
    .max(750, "R cannot be greater than 750 pixels")
    .required("R is required")
});

export const UpdateRInput = React.memo(({ knobId, r, updateR }) => {
  return (
    <Formik
      enableReinitialize
      initialValues={{ r }}
      validationSchema={UpdateRInputSchema}
      validateOnChange={false}
      validateOnBlur={false}
      onSubmit={(values, { setSubmitting }) => {
        setSubmitting(false);
        updateR(knobId, values.r);
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
              id="r"
              placeholder="Update r"
              name="r"
              type="number"
              value={values.r}
              onChange={handleChange}
              action={
                <Button
                  icon="r circle"
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

UpdateRInput.propTypes = {
  knobId: PropTypes.string,
  r: PropTypes.number,
  dispatch: PropTypes.func
};
