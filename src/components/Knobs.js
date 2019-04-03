import React from "react";
import { FootSwitch } from "./FootSwitch";
import { Knob } from "./Knob";
import { Switch } from "./Switch";
import { useStateValue } from "../StateProvider";
import { Query } from "react-apollo";
import gql from "graphql-tag";

const FEED_QUERY = gql`
  query {
    knobs {
      id
      type
      description
      cx
      cy
      r
      angle
      pedal {
        id
      }
      builder {
        id
      }
    }
  }
`;

export const Knobs = () => {
  const [, dispatch] = useStateValue();

  return (
    <Query query={FEED_QUERY}>
      {({ loading, error, data }) => {
        if (loading) return <div>Fetching</div>;
        if (error) return <div>Error</div>;

        const { knobs } = data;
        console.log(data);

        return knobs.map(knob => {
          switch (knob.type) {
            case "FootSwitch":
              return (
                <FootSwitch
                  key={knob.id}
                  footSwitchDetails={knob}
                  dispatch={dispatch}
                />
              );
            case "Knob":
              console.log(knob);
              return (
                <Knob key={knob.id} knobDetails={knob} dispatch={dispatch} />
              );
            case "Switch":
              return (
                <Switch
                  key={knob.id}
                  switchDetails={knob}
                  dispatch={dispatch}
                />
              );
            default:
              return null;
          }
        });
      }}
    </Query>
  );
};
