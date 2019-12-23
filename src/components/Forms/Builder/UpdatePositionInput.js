import React from "react";
import { Button, Input, Form } from "semantic-ui-react";
import { ValidationErrors } from "../Shared/ValidationErrors";
import { Formik } from "formik";
import * as Yup from "yup";
import { isEmpty } from "lodash";
import { PropTypes } from "prop-types";

const UpdatePositionInputSchema = Yup.object().shape({
  position: Yup.number()
    .min(0, "Position cannot be a negative number")
    .max(750, "Position cannot be greater than 750 pixels")
    .required("Position is required")
});

export const UpdatePositionInput = React.memo(
  ({ knobId, position, updatePosition }) => {
    return (
      <Formik
        enableReinitialize
        initialValues={{ position }}
        validationSchema={UpdatePositionInputSchema}
        validateOnChange={false}
        validateOnBlur={false}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(false);
          updatePosition(knobId, values.position);
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
                id="position"
                placeholder="Update position"
                name="position"
                type="number"
                value={values.position}
                onChange={handleChange}
                action={
                  <Button
                    icon="dna"
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

UpdatePositionInput.propTypes = {
  knobId: PropTypes.string,
  position: PropTypes.number,
  dispatch: PropTypes.func,
  updatePosition: PropTypes.func
};
UpdatePositionInput.displayName = "UpdatePositionInput";
