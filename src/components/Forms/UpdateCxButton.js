import React from "react";
import { Button, Input, Form } from "semantic-ui-react";
import { ValidationErrors } from "./ValidationErrors";
import { Formik } from "formik";
import * as Yup from "yup";
import { isEmpty } from "lodash";

const UpdateCxButtonSchema = Yup.object().shape({
  cx: Yup.number()
    .min(0, "Center X cannot be a negative number")
    .max(750, "Center X cannot be greater than 750 pixels")
    .required("Center X is required")
});

export const UpdateCxButton = React.memo(({ knobId, cx, dispatch }) => {
  return (
    <Formik
      enableReinitialize
      initialValues={{ cx }}
      validationSchema={UpdateCxButtonSchema}
      validateOnChange={false}
      validateOnBlur={false}
      onSubmit={(values, { setSubmitting }) => {
        dispatch({
          type: "UPDATE_CX",
          selectedComponentId: knobId,
          cx: values.cx
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
              id="cx"
              placeholder="Update cx"
              name="cx"
              type="number"
              value={values.cx}
              onChange={handleChange}
              action={
                <Button
                  icon="resize horizontal"
                  size="mini"
                  color="blue"
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
