import React, { useState } from "react";
import { Button, Input, Form } from "semantic-ui-react";

export const AddSwitchForm = React.memo(({ dispatch }) => {
  const [cx, setCx] = useState(0);
  const [cy, setCy] = useState(0);
  const [width, setWidth] = useState(0);
  const [description, setDescription] = useState("");

  return (
    <Form
      onSubmit={event => {
        event.preventDefault();

        dispatch({
          type: "ADD_KNOB",
          knob: {
            type: "Switch",
            cx,
            cy,
            width,
            description
          }
        });

        setCx(0);
        setCy(0);
        setWidth(0);
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
        <label htmlFor="r">Width </label>
        <Input
          id="r"
          placeholder="Set Width"
          name="set-r"
          type="number"
          onChange={event => {
            setWidth(parseFloat(event.target.value));
          }}
          value={width}
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
      <Button type="submit">Add Switch</Button>
    </Form>
  );
});
