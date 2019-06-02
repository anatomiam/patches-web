import React from "react";
import { Knobs } from "../Knobs";
import { Query } from "react-apollo";
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
  return (
    <Query query={PEDAL_QUERY_CACHE}>
      {({ loading, error, data }) => {
        if (loading) return <div>Fetching</div>;
        if (error) return <div>Error</div>;

        const {
          knobs,
          width,
          height,
          name,
          selectedComponent
        } = data.pedals[0];
        console.log(knobs, width, height, name, selectedComponent);
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
      }}
    </Query>
  );
};
