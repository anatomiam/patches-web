import React, { useState } from "react";
import gql from "graphql-tag";
import { useMutation } from "react-apollo-hooks";

const CREATE_PEDAL = gql`
  mutation CreatePedal($name: String!, $width: Float, $height: Float) {
    createPedal(name: $name, width: $width, height: $height) {
      id
    }
  }
`;

// TODO inject props to initialize state
// shouldn't need a mutation here, only update cache in this componenet
// mutation should be in it's own component that uses the cache for all the parts and pieces

export const PedalForm = ({ width, height, name }) => {
  // arbitrarily starting local state variables with '_'
  const [_width, setWidth] = useState(width);
  const [_height, setHeight] = useState(height);
  const [_name, setName] = useState(name);

  const createPedal = useMutation(CREATE_PEDAL, {
    update: cache => {
      cache.writeData({
        data: { pedal: { __typename: "Pedal", _width, _height, _name } }
      });
    }
  });

  return (
    <>
      <form
        onSubmit={event => {
          event.preventDefault();
          createPedal({
            variables: { name: _name, width: _width, height: _height }
          });
        }}
      >
        <p>
          <label htmlFor="name">Name </label>
          <input
            id="name"
            placeholder="Set Name"
            name="set-name"
            type="text"
            onChange={event => {
              setName(event.target.value);
            }}
            value={_name}
          />
        </p>
        <p>
          <label htmlFor="width">Width </label>
          <input
            id="width"
            placeholder="Set Width"
            name="set-width"
            type="number"
            onChange={event => {
              setWidth(parseFloat(event.target.value));
            }}
            value={_width}
          />
        </p>
        <p>
          <label htmlFor="height">Height </label>
          <input
            id="height"
            placeholder="Set Height"
            name="set-height"
            type="number"
            onChange={event => {
              setHeight(parseFloat(event.target.value));
            }}
            value={_height}
          />
        </p>
        <p>
          <input type="submit" value="Submit Dimensions" />
        </p>
      </form>
    </>
  );
};
