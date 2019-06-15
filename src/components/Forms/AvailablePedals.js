import React, { useState } from "react";

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
      <label>
        Pick your pedal:
        <select
          value={selectedPedalName}
          onChange={event => {
            event.preventDefault();
            setSelectedPedalName(event.target.value);
            setSelectedPedalId(event.target[event.target.selectedIndex].id);
          }}
        >
          <option value="-- Select a Pedal --">-- Select a Pedal --</option>
          {pedals.map(pedal => {
            return (
              <option key={pedal.id} id={pedal.id} value={pedal.name}>
                {pedal.name}
              </option>
            );
          })}
        </select>
      </label>
      <input type="submit" value="Submit" />
    </form>
  );
});
