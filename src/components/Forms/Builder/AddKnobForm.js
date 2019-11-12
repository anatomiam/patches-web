import React from "react";
import { Button, Input, Form, Label } from "semantic-ui-react";
import { ValidationErrors } from "../Shared/ValidationErrors";
import {
  DivLabeledColorPicker,
  InputColorPicker
} from "../../Pages/PageStyles";
import { Formik } from "formik";
import * as Yup from "yup";
import { isEmpty, uniqueId } from "lodash";
import { PropTypes } from "prop-types";

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
  position: Yup.string().required("Position is required"),
  color: Yup.string()
    .length(7, "Color must be the hex code format (#000000) ")
    .required("Color is required"),
  description: Yup.string()
    .min(2, "Description must be at least 2 characters long.")
    .max(50, "Description must be less than 50 characters long")
    .required("Description is required")
});

export const AddKnobForm = React.memo(({ addKnob }) => {
  return (
    <Formik
      enableReinitialize
      initialValues={{
        cx: 0,
        cy: 0,
        r: 0,
        position: 0,
        color: "#A9A9A9",
        description: ""
      }}
      validationSchema={AddKnobFormSchema}
      validateOnChange={false}
      validateOnBlur={false}
      onSubmit={(values, { setSubmitting }) => {
        addKnob({
          type: "Knob",
          cx: values.cx,
          cy: values.cy,
          r: values.r,
          position: values.position,
          color: values.color,
          description: values.description,
          id: uniqueId("knob-")
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
              id="position"
              label="Position"
              placeholder="Set position"
              name="position"
              type="number"
              onChange={handleChange}
              value={values.position}
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

AddKnobForm.propTypes = { addKnob: PropTypes.func };
