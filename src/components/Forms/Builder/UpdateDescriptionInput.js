import React from "react";
import { Button, Input, Form } from "semantic-ui-react";
import { ValidationErrors } from "../Shared/ValidationErrors";
import { Formik } from "formik";
import * as Yup from "yup";
import { isEmpty } from "lodash";
import { PropTypes } from "prop-types";

const UpdateDescriptionInputSchema = Yup.object().shape({
  description: Yup.string()
    .min(2, "Description must be at least 2 characters long.")
    .max(50, "Description must be less than 50 characters long")
    .required("Description is required")
});

export const UpdateDescriptionInput = React.memo(
  ({ knobId, description, updateDescription }) => {
    return (
      <Formik
        enableReinitialize
        initialValues={{ description }}
        validationSchema={UpdateDescriptionInputSchema}
        validateOnChange={false}
        validateOnBlur={false}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(false);
          updateDescription(knobId, values.description);
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
                id="description"
                placeholder="Update description"
                name="description"
                type="text"
                value={values.description}
                onChange={handleChange}
                action={
                  <Button
                    icon="paragraph"
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
  }
);

UpdateDescriptionInput.propTypes = {
  knobId: PropTypes.string,
  description: PropTypes.string,
  dispatch: PropTypes.func,
  updateDescription: PropTypes.func
};
UpdateDescriptionInput.displayName = "UpdateDescriptionInput";
