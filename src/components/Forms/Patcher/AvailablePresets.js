import React, { useState } from "react";
import { Select, Button } from "semantic-ui-react";

export const AvailablePresets = React.memo(({ presets, dispatch }) => {
  const [selectedPresetId, setSelectedPresetId] = useState("");
  const [selectedPresetName, setSelectedPresetName] = useState("");

  const selectedPresetDetails = selectedPresetId
    ? presets.find(preset => {
        return preset.id === selectedPresetId;
      })
    : null;

  return (
    <form
      onSubmit={event => {
        // Is the submit button necessary?
        event.preventDefault();
        dispatch({
          type: "SELECT_PRESET",
          preset: selectedPresetDetails
        });
      }}
    >
      <Select
        placeholder="-- Select a Preset --"
        value={selectedPresetName}
        onChange={(e, data) => {
          setSelectedPresetName(data.value);
          setSelectedPresetId(data.value);
        }}
        options={presets.map(preset => {
          return {
            key: preset.id,
            value: preset.id,
            text: preset.name
          };
        })}
      />
      <Button size="mini" type="submit">
        Submit
      </Button>
    </form>
  );
});
