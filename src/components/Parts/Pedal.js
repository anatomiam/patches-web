import React from "react";
import { Knobs } from "../Knobs";
import { useQuery } from "react-apollo-hooks";
import gql from "graphql-tag";

const PEDAL_QUERY_CACHE = gql`
  query {
    pedals {
      name
      width
      height
      knobs {
        id
      }
      selectedComponent {
        id
      }
    }
  }
`;

const PEDAL_QUERY = gql`
  query {
    pedals {
      id
      name
      width
      height
      selectedComponent {
        id
        type
        description
        cx
        cy
        r
        angle
        width
      }
      knobs {
        id
        type
        description
        builder {
          name
        }
        cx
        cy
        r
        angle
        width
      }
    }
  }
`;

export const Pedal = () => {
  const { data, loading, error } = useQuery(PEDAL_QUERY);
  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  console.log(data);
  const { knobs, width, height, name, selectedComponent } = data.pedals[2];

  return (
    <>
      <h2>{name}</h2>
      <svg className="pedal" width="800" height="500">
        <rect
          width={width}
          height={height}
          style={{
            fill: "grey",
            strokeWidth: 2,
            stroke: "rgb(0,0,0)"
          }}
        />
        <Knobs knobs={knobs} />
      </svg>
    </>
  );
};
