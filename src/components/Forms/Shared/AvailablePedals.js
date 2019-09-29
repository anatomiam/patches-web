import React, { useState } from "react";
import { Select } from "semantic-ui-react";
import { PropTypes } from "prop-types";

export const AvailablePedals = React.memo(({ pedals, dispatch }) => {
  const [selectedPedalName, setSelectedPedalName] = useState("");

  return (
    <Select
      placeholder="-- Select a Pedal --"
      value={selectedPedalName}
      onChange={(e, data) => {
        setSelectedPedalName(data.value);
        const selectedPedal = pedals.find(pedal => {
          return pedal.id === data.value;
        });
        dispatch({
          type: "SELECT_PEDAL",
          pedal: selectedPedal
        });
      }}
      options={pedals.map(pedal => {
        return {
          key: pedal.id,
          value: pedal.id,
          text: pedal.name
        };
      })}
    />
  );
});

AvailablePedals.propTypes = {
  pedals: PropTypes.array,
  dispatch: PropTypes.func
};
