import React from "react";
import { Button, Input, Form, Label } from "semantic-ui-react";
import { ValidationErrors } from "./ValidationErrors";
import { DivLabeledColorPicker, InputColorPicker } from "../Pages/PageStyles";
import { Formik } from "formik";
import * as Yup from "yup";
import { isEmpty, uniqueId } from "lodash";

const AddKnobFormSchema = Yup.object().shape({
  cx: Yup.number()
    .min(0, "Center X cannot be a negative number")
    .max(750, "Center X cannot be greater than 750 pixels")
    .required("Center X is required"),
  cy: Yup.number()
    .min(0, "Center Y cannot be a negative number")
    .max(750, "Center Y cannot be greater than 750 pixels")
    .required("Center Y is required"),
  r: Yup.number()
    .min(1, "Radius must be at least 1")
    .max(750, "Radius cannot be greater than 750 pixels")
    .required("Radius is required"),
  angle: Yup.string().required("Angle is required"),
  color: Yup.string()
    .length(7, "Color must be the hex code format (#000000) ")
    .required("Color is required"),
  description: Yup.string()
    .min(2, "Description must be at least 2 characters long.")
    .max(50, "Description must be less than 50 characters long")
    .required("Description is required")
});

export const AddKnobForm = React.memo(({ dispatch }) => {
  return (
    <Formik
      initialValues={{
        cx: 0,
        cy: 0,
        r: 0,
        angle: 0,
        color: "#A9A9A9",
        description: ""
      }}
      validationSchema={AddKnobFormSchema}
      validateOnChange={false}
      validateOnBlur={false}
      onSubmit={(values, { setSubmitting }) => {
        dispatch({
          type: "ADD_KNOB",
          knob: {
            type: "Knob",
            cx: values.cx,
            cy: values.cy,
            r: values.r,
            angle: values.angle,
            color: values.color,
            description: values.description,
            id: uniqueId("knob-")
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
              id="r"
              label="R"
              placeholder="Set r"
              name="r"
              type="number"
              onChange={handleChange}
              value={values.r}
            />
          </Form.Field>
          <Form.Field>
            <Input
              id="angle"
              label="Angle"
              placeholder="Set angle"
              name="angle"
              type="number"
              onChange={handleChange}
              value={values.angle}
            />
          </Form.Field>
          <Form.Field>
            <DivLabeledColorPicker>
              <Label size="large" horizontal>
                Color
              </Label>
              <InputColorPicker
                id="color"
                label="Color"
                placeholder="Set Color"
                name="color"
                type="color"
                onChange={handleChange}
                value={values.color}
              />
            </DivLabeledColorPicker>
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
            Add Knob
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
