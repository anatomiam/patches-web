import React from "react";
import { Button, Input, Form, Label } from "semantic-ui-react";
import { DivLabeledColorPicker, InputColorPicker } from "../Pages/PageStyles";
import { ValidationErrors } from "./ValidationErrors";
import { Formik } from "formik";
import * as Yup from "yup";
import { isEmpty } from "lodash";

const PedalFormSchema = Yup.object().shape({
  width: Yup.number()
    .min(20, "Width must be at least 20 pixels.")
    .max(750, "Width must be less than 750 pixels")
    .required("Width is required"),
  height: Yup.number()
    .min(20, "Height must be at least 20 pixels.")
    .max(750, "Height must be less than 750 pixels")
    .required("Height is required"),
  color: Yup.string()
    .length(7, "Color must be the hex code format (#000000) ")
    .required("Color is required"),
  name: Yup.string()
    .min(2, "Name must be at least 2 characters long.")
    .max(50, "Name must be less than 50 characters long")
    .required("Color is required")
});

export const PedalForm = React.memo(
  ({ width, height, name, color, id, dispatch }) => {
    const updateId = id ? { id } : {};
    return (
      <Formik
        initialValues={{
          width,
          height,
          color,
          name
        }}
        validationSchema={PedalFormSchema}
        validateOnChange={false}
        validateOnBlur={false}
        onSubmit={(values, { setSubmitting }) => {
          dispatch({
            type: "SET_PEDAL_DETAILS",
            pedalDetails: {
              ...updateId,
              name: values.name,
              height: values.height,
              width: values.width,
              color: values.color
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
                id="name"
                label="Name"
                placeholder="Set Name"
                name="name"
                type="text"
                onChange={handleChange}
                value={values.name}
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
                id="height"
                label="Height"
                placeholder="Set Height"
                name="height"
                type="number"
                onChange={handleChange}
                value={values.height}
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
            <Button type="submit" disabled={isSubmitting}>
              Submit Dimensions
            </Button>
            <Button type="button" disabled={!dirty} onClick={handleReset}>
              Reset
            </Button>
            {!isEmpty(errors) ? <ValidationErrors errors={errors} /> : null}
          </Form>
        )}
      </Formik>
    );
  }
);
