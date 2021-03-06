import * as Yup from "yup";

import { Button, Form, Input, TextArea } from "semantic-ui-react";
import React, { useState } from "react";
import {
  getPatchesToCreate,
  restructureUpdatedPatches
} from "../../../helpers/Helpers";
import { isEmpty, omit, pick } from "lodash";

import { Formik } from "formik";
import { PropTypes } from "prop-types";
import { ValidationErrors } from "../Shared/ValidationErrors";
import { gql } from "apollo-boost";
import { useMutation } from "@apollo/react-hooks";

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

const CREATE_PRESET = gql`
  mutation CreatePreset(
    $user: ID!
    $pedal: ID
    $name: String!
    $description: String!
    $patches: [PatchesInput]
  ) {
    createPreset(
      user: $user
      pedal: $pedal
      name: $name
      description: $description
      patches: $patches
    ) {
      id
    }
  }
`;

const UPDATE_PRESET = gql`
  mutation UpdatePreset(
    $id: ID!
    $name: String
    $description: String
    $patchesToUpdate: [UpdatePatchesInput]
  ) {
    updatePreset(
      id: $id
      name: $name
      description: $description
      patchesToUpdate: $patchesToUpdate
    ) {
      id
    }
  }
`;

export const PatchForm = React.memo(
  ({ patchDetails, selectedComponentId, knobs, userId, pedalId }) => {
    const { name, description, id } = patchDetails.patchNotes;
    const [submitType, setSubmitType] = useState("");
    const [createPreset] = useMutation(CREATE_PRESET);
    const [updatePreset] = useMutation(UPDATE_PRESET);

    // flatten form values for formik
    // this is un-flattened on submit
    const initialValues = {
      ...{},
      name,
      description,
      ...patchDetails.knobNotes
    };

    return (
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={PatchFormSchema}
        validateOnChange={false}
        validateOnBlur={false}
        onSubmit={(values, { setSubmitting }) => {
          const knobNotes = omit(values, ["name", "description"]);
          const patchNotes = { id, ...pick(values, ["name", "description"]) };

          if (submitType === "create") {
            const patchesToCreate = getPatchesToCreate(knobs, knobNotes);
            createPreset({
              variables: {
                user: userId,
                pedal: pedalId,
                name: patchNotes.name,
                description: patchNotes.description,
                patches: patchesToCreate
              }
            });
          } else if (submitType === "update") {
            const patchesToUpdate = restructureUpdatedPatches(knobs, knobNotes);
            updatePreset({
              variables: {
                id,
                name: patchNotes.name,
                description: patchNotes.description,
                patchesToUpdate
              }
            });
          }
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
                    value={values[knob.id]}
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
            <Button
              type="submit"
              disabled={isSubmitting}
              onClick={() => {
                setSubmitType("create");
              }}
            >
              Create
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              onClick={() => {
                setSubmitType("update");
              }}
            >
              Update
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

PatchForm.propTypes = {
  patchDetails: PropTypes.object,
  selectedComponentId: PropTypes.string,
  userId: PropTypes.string,
  pedalId: PropTypes.string,
  knobs: PropTypes.array,
  setPatchDetails: PropTypes.func
};
PatchForm.displayName = "PatchForm";
