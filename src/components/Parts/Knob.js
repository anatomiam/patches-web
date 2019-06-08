import React from "react";
import gql from "graphql-tag";
import { useMutation, useApolloClient } from "react-apollo-hooks";

const UPDATE_SELECTED_COMPONENT = gql`
  mutation UpdateSelectedComponent($id: String!) {
    updateSelectedComponent(id: $id) {
      id
    }
  }
`;

// return (
//   <>
//     <form
//       onSubmit={event => {
//         event.preventDefault();
//         createPedal({
//           variables: { name: _name, width: _width, height: _height }
//         });
//       }}
//     ></form>

// client.writeData({
//   data: {
//     selectedComponent: { id, __typename: "SelectedComponent" }
//   }
// });
export const Knob = ({ knobDetails, dispatch }) => {
  const client = useApolloClient();
  const { angle, cx, cy, r, id } = knobDetails;
  const selectComponent = useMutation(UPDATE_SELECTED_COMPONENT, {
    variables: { id }
  });

  return (
    <g transform={`rotate(${angle} ${cx} ${cy})`}>
      <circle
        className="knob component"
        cx={cx}
        cy={cy}
        r={r}
        stroke="black"
        strokeWidth="1"
        fill="darkgrey"
        // onClick={selectComponent}
        onClick={() =>
          dispatch({
            type: "SET_SELECTED_COMPONENT",
            selectedComponent: id
          })
        }
      />
      <line
        x1={cx}
        y1={cy + r / 4}
        x2={cx}
        y2={cy + (3.25 * r) / 4}
        stroke="black"
        strokeWidth="1"
        strokeLinecap="round"
      />
    </g>
  );
};
