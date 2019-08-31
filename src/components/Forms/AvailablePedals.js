import React, { useState } from "react";
import { Select, Button } from "semantic-ui-react";

export const AvailablePedals = React.memo(({ pedals, dispatch }) => {
  const [selectedPedalId, setSelectedPedalId] = useState("");
  const [selectedPedalName, setSelectedPedalName] = useState("");

  const selectedPedalDetails = selectedPedalId
    ? pedals.find(pedal => {
        return pedal.id === selectedPedalId;
      })
    : null;

  return (
    <form
      onSubmit={event => {
        // Is the submit button necessary?
        event.preventDefault();
        dispatch({
          type: "SELECT_PEDAL",
          pedal: selectedPedalDetails
        });
      }}
    >
      <Select
        placeholder="-- Select a Pedal --"
        value={selectedPedalName}
        onChange={(e, data) => {
          setSelectedPedalName(data.value);
          setSelectedPedalId(data.value);
        }}
        options={pedals.map(pedal => {
          return {
            key: pedal.id,
            value: pedal.id,
            text: pedal.name
          };
        })}
      />
      <Button size="mini" type="submit">
        Submit
      </Button>
    </form>
  );
});
