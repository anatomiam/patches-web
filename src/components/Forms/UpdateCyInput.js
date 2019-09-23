import React from "react";
import { Button, Input, Form } from "semantic-ui-react";
import { ValidationErrors } from "./ValidationErrors";
import { Formik } from "formik";
import * as Yup from "yup";
import { isEmpty } from "lodash";

const UpdateCyInputSchema = Yup.object().shape({
  cy: Yup.number()
    .min(0, "Center Y cannot be a negative number")
    .max(750, "Center Y cannot be greater than 750 pixels")
    .required("Center Y is required")
});

export const UpdateCyInput = React.memo(({ knobId, cy, dispatch }) => {
  return (
    <Formik
      enableReinitialize
      initialValues={{ cy }}
      validationSchema={UpdateCyInputSchema}
      validateOnChange={false}
      validateOnBlur={false}
      onSubmit={(values, { setSubmitting }) => {
        dispatch({
          type: "UPDATE_CY",
          selectedComponentId: knobId,
          cy: values.cy
        });
        setSubmitting(false);
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
            <Input
              size="mini"
              id="cy"
              placeholder="Update cy"
              name="cy"
              type="number"
              value={values.cy}
              onChange={handleChange}
              action={
                <Button
                  icon="resize vertical"
                  size="mini"
                  color="green"
                  className="icon-pointer"
                  type="submit"
                  disabled={isSubmitting}
                />
              }
            />
          </Form.Field>
          {!isEmpty(errors) ? <ValidationErrors errors={errors} /> : null}
        </Form>
      )}
    </Formik>
  );
});