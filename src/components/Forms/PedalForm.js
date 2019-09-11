import React from "react";
import { Button, Input, Form, Label } from "semantic-ui-react";
import { DivLabeledColorPicker, InputColorPicker } from "../PageStyles";
import { Formik } from "formik";

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
        onSubmit={(values, { setSubmitting }) => {
          console.log(values);
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
          values,
          errors,
          touched,
          handleChange,
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
          </Form>
        )}
      </Formik>
    );
  }
);
