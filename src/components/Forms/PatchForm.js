import React from "react";
import { Button, Input, Form, TextArea } from "semantic-ui-react";
import { ValidationErrors } from "./ValidationErrors";
import { Formik } from "formik";
import * as Yup from "yup";
import { isEmpty } from "lodash";
import { flattenKnobObjects } from "../../state/helpers";

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

export const PatchForm = React.memo(
  ({ name, description, selectedComponentId, knobs, dispatch }) => {
    const knobNotes = flattenKnobObjects(knobs);
    const initialValues = { ...{}, name, description, ...knobNotes };
    return (
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={PatchFormSchema}
        validateOnChange={false}
        validateOnBlur={false}
        onSubmit={(values, { setSubmitting }) => {
          dispatch({
            type: "SET_PATCH_DETAILS",
            patchDetails: {
              name: values.name,
              description: values.description,
              knobNotes: values.knobNotes
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
                label="Patch Name"
                placeholder="Name"
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
                placeholder="Add patch notes"
                name="description"
                onChange={handleChange}
                value={values.description}
              />
            </Form.Field>
            {knobs.map(knob => {
              return (
                <Form.Field key={`knob-form-${knob.id}`}>
                  <TextArea
                    id={knob.id}
                    label={knob.id}
                    placeholder={`Add knob notes`}
                    name={knob.id}
                    onChange={handleChange}
                    value={values[`knobNotes.${knob.id}`]}
                    style={{
                      display:
                        knob.id === selectedComponentId
                          ? "inline-block"
                          : "none"
                    }}
                  />
                </Form.Field>
              );
            })}
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
  }
);
