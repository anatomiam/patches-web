import React from "react";
import { Form, Button } from "semantic-ui-react";
import { ValidationErrors } from "../Shared/ValidationErrors";
import { InputColorPicker } from "../../Pages/PageStyles";
import { Formik } from "formik";
import * as Yup from "yup";
import { isEmpty } from "lodash";
import { PropTypes } from "prop-types";

const UpdateColorInputSchema = Yup.object().shape({
  color: Yup.string()
    .length(7, "Color must be the hex code format (#000000) ")
    .required("Color is required")
});

export const UpdateColorInput = React.memo(({ knobId, color, updateColor }) => {
  return (
    <Formik
      enableReinitialize
      initialValues={{ color }}
      validationSchema={UpdateColorInputSchema}
      validateOnChange={false}
      validateOnBlur={false}
      onSubmit={(values, { setSubmitting }) => {
        setSubmitting(false);
        updateColor(knobId, values.color);
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
            <InputColorPicker
              id="color"
              label="Color"
              placeholder="Set Color"
              name="color"
              type="color"
              onChange={handleChange}
              value={values.color}
            />
            <Button
              icon="dna"
              size="mini"
              color="blue"
              className="icon-pointer"
              type="submit"
              disabled={isSubmitting}
            />
          </Form.Field>
          {!isEmpty(errors) ? <ValidationErrors errors={errors} /> : null}
        </Form>
      )}
    </Formik>
  );
});

UpdateColorInput.propTypes = {
  knobId: PropTypes.string,
  color: PropTypes.string,
  dispatch: PropTypes.func,
  updateColor: PropTypes.func
};
UpdateColorInput.displayName = "UpdateColorInput";
