import React from "react";
import { AddKnobForm } from "./components/Forms/AddKnobForm";
import { AddSwitchForm } from "./components/Forms/AddSwitchForm";
import { ComponentInfo } from "./components/ComponentInfo";
import { Pedal } from "./components/Parts/Pedal";
import { PedalForm } from "./components/Forms/PedalForm";
import { reducer, initialState } from "./reducer.js";
import { StateProvider } from "./StateProvider";
import "./index.css";
import { useQuery } from "react-apollo-hooks";
import gql from "graphql-tag";

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

const App = () => {
  const { data, loading, error } = useQuery(PEDAL_QUERY);
  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;
  console.log(data)

  const { knobs, width, height, name } = data.pedals[0];
  // TODO build landing page that lets a user select from templates or existing pedals
  // second page will be the edit page
  return (
    <StateProvider initialState={initialState} reducer={reducer}>
      <div className="info">
        <div className="form-stuff">
          <PedalForm width={width} height={height} name={name} />
          <AddKnobForm />
          <AddSwitchForm />
        </div>
        <div className="display-stuff">
          <ComponentInfo />
        </div>
      </div>
      <Pedal knobs={knobs} width={width} height={height} name={name} />
    </StateProvider>
  );
};

export default App;
