import React from "react";
import { Button, Input, Form } from "semantic-ui-react";
import { ValidationErrors } from "./ValidationErrors";
import { Formik } from "formik";
import * as Yup from "yup";
import { isEmpty, uniqueId } from "lodash";

const AddSwitchFormSchema = Yup.object().shape({
  cx: Yup.number()
    .min(0, "Center X cannot be a negative number")
    .max(750, "Center X cannot be greater than 750 pixels")
    .required("Center X is required"),
  cy: Yup.number()
    .min(0, "Center Y cannot be a negative number")
    .max(750, "Center Y cannot be greater than 750 pixels")
    .required("Center Y is required"),
  width: Yup.number()
    .min(1, "Width must be at least 1")
    .max(750, "Width cannot be greater than 750 pixels")
    .required("Width is required"),
  description: Yup.string()
    .min(2, "Description must be at least 2 characters long.")
    .max(50, "Description must be less than 50 characters long")
    .required("Description is required")
});

export const AddSwitchForm = React.memo(({ dispatch }) => {
  return (
    <Formik
      enableReinitialize
      initialValues={{
        cx: 0,
        cy: 0,
        width: 0,
        description: ""
      }}
      validationSchema={AddSwitchFormSchema}
      validateOnChange={false}
      validateOnBlur={false}
      onSubmit={(values, { setSubmitting }) => {
        dispatch({
          type: "ADD_KNOB",
          knob: {
            type: "Switch",
            cx: values.cx,
            cy: values.cy,
            width: values.width,
            description: values.description,
            id: uniqueId("switch-")
          }
        });
        setSubmitting(false);
      }}
    >
      {({
        dirty,
        values,
        errors,
        handleChange,
        handleReset,
        isSubmitting,
        handleSubmit
      }) => (
        <Form
          onSubmit={event => {
            event.preventDefault();
            handleSubmit();
          }}
        >
          <Form.Field>
            <Input
              id="cx"
              label="CX"
              placeholder="Set cx"
              name="cx"
              type="number"
              onChange={handleChange}
              value={values.cx}
            />
          </Form.Field>
          <Form.Field>
            <Input
              id="cy"
              label="CY"
              placeholder="Set cy"
              name="cy"
              type="number"
              onChange={handleChange}
              value={values.cy}
            />
          </Form.Field>
          <Form.Field>
            <Input
              id="width"
              label="Width"
              placeholder="Set Width"
              name="width"
              type="number"
              onChange={handleChange}
              value={values.width}
            />
          </Form.Field>
          <Form.Field>
            <Input
              id="description"
              label="Desc."
              placeholder="Set description"
              name="description"
              type="text"
              onChange={handleChange}
              value={values.description}
            />
          </Form.Field>
          <Button type="submit" disabled={isSubmitting}>
            Add Switch
          </Button>
          <Button type="button" disabled={!dirty} onClick={handleReset}>
            Reset
          </Button>
          {!isEmpty(errors) ? <ValidationErrors errors={errors} /> : null}
        </Form>
      )}
    </Formik>
  );
});
