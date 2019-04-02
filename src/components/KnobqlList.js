import React, { Component } from "react";
import Knobql from "./Knobql";
import { Query } from "react-apollo";
import gql from "graphql-tag";

const FEED_QUERY = gql`
  query {
    knobs {
      id
      type
      description
      cx
      pedal {
        id
      }
      builder {
        id
      }
    }
  }
`;

const KnobqlList = () => {
  return (
    <Query query={FEED_QUERY}>
      {({ loading, error, data }) => {
        if (loading) return <div>Fetching</div>;
        if (error) return <div>Error</div>;

        const knobsToRender = data.knobs;
        return (
          <div>
            {knobsToRender.map(knob => (
              <Knobql key={knob.id} knob={knob} />
            ))}
          </div>
        );
      }}
    </Query>
  );
};

export default KnobqlList;
