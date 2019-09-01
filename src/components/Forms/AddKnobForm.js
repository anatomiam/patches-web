import React, { useState } from "react";
import { Button, Input, Form } from "semantic-ui-react";

export const AddKnobForm = React.memo(({ saveKnob, dispatch }) => {
  const [cx, setCx] = useState("");
  const [cy, setCy] = useState("");
  const [r, setR] = useState("");
  const [angle, setAngle] = useState("");
  const [description, setDescription] = useState("");

  return (
    <Form
      onSubmit={event => {
        event.preventDefault();
        dispatch({
          type: "ADD_KNOB",
          knob: {
            type: "Knob",
            cx,
            cy,
            r,
            angle,
            description
          }
        });

        setCx("");
        setCy("");
        setR("");
        setAngle("");
        setDescription("");
      }}
    >
      <Form.Field>
        <Input
          label="CX"
          placeholder="Set cx"
          name="set-cx"
          type="number"
          onChange={event => {
            setCx(parseFloat(event.target.value));
          }}
          value={cx}
        />
      </Form.Field>
      <Form.Field>
        <Input
          id="cy"
          label="CY"
          placeholder="Set cy"
          name="set-cy"
          type="number"
          onChange={event => {
            setCy(parseFloat(event.target.value));
          }}
          value={cy}
        />
      </Form.Field>
      <Form.Field>
        <Input
          id="r"
          label="R"
          placeholder="Set r"
          name="set-r"
          type="number"
          onChange={event => {
            setR(parseFloat(event.target.value));
          }}
          value={r}
        />
      </Form.Field>
      <Form.Field>
        <Input
          id="angle"
          label="Angle"
          placeholder="Set angle"
          name="set-angle"
          type="number"
          onChange={event => {
            setAngle(parseFloat(event.target.value));
          }}
          value={angle}
        />
      </Form.Field>
      <Form.Field>
        <Input
          id="description"
          label="Desc."
          placeholder="Set description"
          name="set-description"
          type="text"
          onChange={event => {
            setDescription(event.target.value);
          }}
          value={description}
        />
      </Form.Field>
      <Button size="mini" type="submit">
        Add Knob
      </Button>
    </Form>
  );
});
