import React, { useState } from "react";

export const AvailablePedals = ({ pedals, dispatch }) => {
  const [selection, setSelection] = useState("");
  return (
    <form onSubmit={console.log(`You picked ${selection}`)}>
      <label>
        Pick your pedal:
        <select
          value={selection}
          onChange={event => {
            event.preventDefault();
            setSelection(event.target.value);
          }}
        >
          <option value="-- Select a Pedal --">-- Select a Pedal --</option>
          {pedals.map(pedal => {
            return (
              <option key={pedal.id} value={pedal.name}>
                {pedal.name}
              </option>
            );
          })}
        </select>
      </label>
      <input type="submit" value="Submit" />
    </form>
  );
};
