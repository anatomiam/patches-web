import React from "react";
import { Button, Input, Form, Label } from "semantic-ui-react";
import { DivLabeledColorPicker, InputColorPicker } from "../PageStyles";
import { Formik } from "formik";
import * as Yup from "yup";

const PedalFormSchema = Yup.object().shape({
  width: Yup.number()
    .min(20, "Too Short!")
    .max(750, "Too Long!")
    .required("Required"),
  height: Yup.number()
    .min(20, "Too Short!")
    .max(750, "Too Long!")
    .required("Required"),
  color: Yup.string()
    .length(7, "Must be a valid color")
    .required("Required"),
  name: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required")
});

export const PedalForm = React.memo(
  ({ width, height, name, color, dispatch }) => {
    return (
      <Formik
        initialValues={{
          width: width,
          height: height,
          color: color,
          name: name
        }}
        validationSchema={PedalFormSchema}
        onSubmit={(values, { setSubmitting }) => {
          dispatch({
            type: "SET_PEDAL_DETAILS",
            pedalDetails: {
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
          touched,
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
            {errors.name && touched.name ? <div>{errors.name}</div> : null}
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
            {errors.width && touched.width ? <div>{errors.width}</div> : null}
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
            {errors.height && touched.height ? (
              <div>{errors.height}</div>
            ) : null}
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
            {errors.color && touched.color ? <div>{errors.color}</div> : null}
            <Button type="submit" disabled={isSubmitting}>
              Submit Dimensions
            </Button>
            <Button type="button" disabled={!dirty} onClick={handleReset}>
              Reset
            </Button>
          </Form>
        )}
      </Formik>
    );
  }
);
