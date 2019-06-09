import React from "react";
import gql from "graphql-tag";
import { useMutation } from "react-apollo-hooks";

const CREATE_PEDAL = gql`
  mutation CreatePedal($name: String!, $width: Float, $height: Float) {
    createPedal(name: $name, width: $width, height: $height) {
      id
    }
  }
`;

export const CreatePedalButton = React.memo(({ localState }) => {
  // arbitrarily starting local state variables with '_'
  const { name, width, height } = localState.pedal;
  const createPedal = useMutation(CREATE_PEDAL, {
    update: cache => {
      cache.writeData({
        data: { pedal: { __typename: "Pedal", width, height, name } }
      });
    }
  });

  return (
    <>
      <form>
        <button
          onClick={event => {
            event.preventDefault();
            createPedal({
              variables: { name, width, height }
            });
          }}
        >
          Save Pedal
        </button>
      </form>
    </>
  );
});
