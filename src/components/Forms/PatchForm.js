import React from "react";
import { Button, Input, Form, TextArea } from "semantic-ui-react";
import { ValidationErrors } from "./ValidationErrors";
import { Formik } from "formik";
import * as Yup from "yup";
import { isEmpty } from "lodash";

const PatchFormSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Name must be at least 2 characters long.")
    .max(50, "Name must be less than 50 characters long")
    .required("Name is required"),
  description: Yup.string()
    .min(2, "Description must be at least 2 characters long.")
    .max(50, "Description must be less than 50 characters long")
    .required("Description is required")
});

export const PatchForm = React.memo(({ name, description, dispatch }) => {
  return (
    <Formik
      initialValues={{
        name,
        description
      }}
      validationSchema={PatchFormSchema}
      validateOnChange={false}
      validateOnBlur={false}
      onSubmit={(values, { setSubmitting }) => {
        dispatch({
          type: "SET_PATCH_DETAILS",
          patchDetails: {
            name: values.name,
            description: values.description
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
            <TextArea
              id="description"
              label="Description"
              placeholder="Set Description"
              name="description"
              onChange={handleChange}
              value={values.description}
            />
          </Form.Field>
          <Button type="submit" disabled={isSubmitting}>
            Submit Patch Notes
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
