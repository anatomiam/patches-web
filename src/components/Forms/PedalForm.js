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

export const PedalForm = () => {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [name, setName] = useState("Template");
  const createPedal = useMutation(CREATE_PEDAL, {
    update: cache => {
      cache.writeData({
        data: { pedal: { __typename: "Pedal", width, height, name } }
      });
    }
  });
  return (
    <>
      <form
        onSubmit={event => {
          event.preventDefault();
          createPedal({ variables: { name, width, height } });
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
            value={name}
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
            value={width}
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
            value={height}
          />
        </p>
        <p>
          <input type="submit" value="Submit Dimensions" />
        </p>
      </form>
    </>
  );
};
