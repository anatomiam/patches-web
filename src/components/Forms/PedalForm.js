import React, { useState } from "react";
import { useStateValue } from "../../StateProvider";
import gql from "graphql-tag";
import { Query, Mutation } from "react-apollo";

const CREATE_PEDAL = gql`
  mutation CreatePedal($name: String!, $width: Float, $height: Float) {
    createPedal(name: $name, width: $width, height: $height) {
      id
    }
  }
`;

export const PedalForm = () => {
  const [{ pedal }, dispatch] = useStateValue();

  const [width, setWidth] = useState(pedal.dimensions.width);
  const [height, setHeight] = useState(pedal.dimensions.height);
  const [name, setName] = useState("Joseph");

  return (
    <Query query={PEDAL_QUERY}>
      {({ loading, error, data }) => {
        if (loading) return <div>Fetching</div>;
        if (error) return <div>Error</div>;

        const { width, height, name } = data.pedals[0];
        console.log(width, height, name);
        return (
          <Mutation
            mutation={CREATE_PEDAL}
            update={cache => {
              cache.writeData({ data: { pedal: name } });
            }}
          >
            {(createPedal, { data }) => (
              <form
                onSubmit={event => {
                  event.preventDefault();
                  // dispatch({
                  //   type: "SET_DIMENSIONS",
                  //   dimensions: {
                  //     width,
                  //     height
                  //   }
                  // });
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
                    // onChange={event => {
                    //   setName(event.target.value);
                    // }}
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
                    // onChange={event => {
                    //   setWidth(parseFloat(event.target.value));
                    // }}
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
                    // onChange={event => {
                    //   setHeight(parseFloat(event.target.value));
                    // }}
                    value={height}
                  />
                </p>
                <p>
                  <input type="submit" value="Submit Dimensions" />
                </p>
              </form>
            )}
          </Mutation>
        );
      }}
    </Query>
  );
};
