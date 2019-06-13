import React from "react";
import gql from "graphql-tag";
import { useMutation } from "react-apollo-hooks";

const CREATE_PEDAL = gql`
  mutation CreatePedal(
    $name: String!
    $builder: ID!
    $width: Float
    $height: Float
    $knobs: [KnobsInput]
  ) {
    createPedal(
      name: $name
      builder: $builder
      width: $width
      height: $height
      knobs: $knobs
    ) {
      id
    }
  }
`;

export const CreatePedalButton = React.memo(({ localState }) => {
  // arbitrarily starting local state variables with '_'
  const { knobs, builder } = localState;
  const { name, width, height } = localState.pedal;
  const createPedal = useMutation(CREATE_PEDAL);
  return (
    <>
      <form>
        <button
          onClick={event => {
            event.preventDefault();
            createPedal({
              variables: {
                name,
                builder,
                width,
                height,
                knobs
              }
            });
          }}
        >
          Save Pedal
        </button>
      </form>
    </>
  );
});
