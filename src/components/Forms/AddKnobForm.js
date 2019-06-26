import React, { useState } from "react";
import { Button, Input, Form } from "semantic-ui-react";

export const AddKnobForm = React.memo(({ saveKnob, dispatch }) => {
  const [cx, setCx] = useState(0);
  const [cy, setCy] = useState(0);
  const [r, setR] = useState(0);
  const [angle, setAngle] = useState(0);
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

        setCx(0);
        setCy(0);
        setR(0);
        setAngle(0);
        setDescription("");
      }}
    >
      <Form.Field>
        <label htmlFor="cx">CX </label>
        <Input
          id="cx"
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
        <label htmlFor="cy">CY </label>
        <Input
          id="cy"
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
        <label htmlFor="r">R </label>
        <Input
          id="r"
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
        <label htmlFor="angle">Angle </label>
        <Input
          id="angle"
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
        <label htmlFor="description">Description </label>
        <Input
          id="description"
          placeholder="Set description"
          name="set-description"
          type="text"
          onChange={event => {
            setDescription(event.target.value);
          }}
          value={description}
        />
      </Form.Field>
      <Button type="submit">Add Knob</Button>
    </Form>
  );
});
