import React, { useState } from "react";
import { Button, Input, Form, Label } from "semantic-ui-react";
import { DivLabeledColorPicker, InputColorPicker } from "../PageStyles";

export const PedalForm = React.memo(({ width, height, name, dispatch }) => {
  // arbitrarily starting local state variables with '_'
  const [_width, setWidth] = useState("");
  const [_height, setHeight] = useState("");
  const [_color, setColor] = useState("#000000");
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
            width: _width,
            color: _color
          }
        });
      }}
    >
      <Form.Field>
        <Input
          id="name"
          label="Name"
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
        <Input
          id="width"
          label="Width"
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
        <Input
          id="height"
          label="Height"
          placeholder="Set Height"
          name="set-height"
          type="number"
          onChange={event => {
            setHeight(parseFloat(event.target.value));
          }}
          value={_height}
        />
      </Form.Field>
      <Form.Field>
        <DivLabeledColorPicker>
          <Label size="large" horizontal>
            Color
          </Label>
          <InputColorPicker
            id="color"
            label="Color"
            placeholder="Set Color"
            name="set-color"
            type="color"
            onChange={event => {
              setColor(event.target.value);
            }}
            value={_color}
          />
        </DivLabeledColorPicker>
      </Form.Field>
      <Button size="mini" type="submit">
        Submit Dimensions
      </Button>
    </Form>
  );
});
