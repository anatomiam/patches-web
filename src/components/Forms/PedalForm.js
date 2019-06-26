import React, { useState } from "react";
import { Button, Input, Form } from "semantic-ui-react";

export const PedalForm = React.memo(({ width, height, name, dispatch }) => {
  // arbitrarily starting local state variables with '_'
  const [_width, setWidth] = useState(width);
  const [_height, setHeight] = useState(height);
  const [_name, setName] = useState(name);

  return (
    <Form
      onSubmit={event => {
        event.preventDefault();
        dispatch({
          type: "SET_PEDAL_DETAILS",
          pedalDetails: {
            name: _name,
            height: _height,
            width: _width
          }
        });
      }}
    >
      <Form.Field>
        <label htmlFor="name">Name </label>
        <Input
          id="name"
          placeholder="Set Name"
          name="set-name"
          type="text"
          onChange={event => {
            setName(event.target.value);
          }}
          value={_name}
        />
      </Form.Field>
      <Form.Field>
        <label htmlFor="width">Width </label>
        <Input
          id="width"
          placeholder="Set Width"
          name="set-width"
          type="number"
          onChange={event => {
            setWidth(parseFloat(event.target.value));
          }}
          value={_width}
        />
      </Form.Field>
      <Form.Field>
        <label htmlFor="height">Height </label>
        <Input
          id="height"
          placeholder="Set Height"
          name="set-height"
          type="number"
          onChange={event => {
            setHeight(parseFloat(event.target.value));
          }}
          value={_height}
        />
      </Form.Field>
      <Button type="submit">Submit Dimensions</Button>
    </Form>
  );
});
