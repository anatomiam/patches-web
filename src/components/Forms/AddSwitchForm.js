import React, { useState } from "react";
import { Button, Input, Form } from "semantic-ui-react";

export const AddSwitchForm = React.memo(({ dispatch }) => {
  const [cx, setCx] = useState("");
  const [cy, setCy] = useState("");
  const [width, setWidth] = useState("");
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

        setCx("");
        setCy("");
        setWidth("");
        setDescription("");
      }}
    >
      <Form.Field>
        <Input
          id="cx"
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
        <Input
          id="description"
          label="Description"
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
