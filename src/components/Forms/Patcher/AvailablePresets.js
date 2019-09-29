import React, { useState } from "react";
import { Select } from "semantic-ui-react";
import { PropTypes } from "prop-types";

export const AvailablePresets = React.memo(({ presets, dispatch }) => {
  const [selectedPresetName, setSelectedPresetName] = useState("");
  return (
    <Select
      placeholder="-- Select a Preset --"
      value={selectedPresetName}
      onChange={(e, data) => {
        setSelectedPresetName(data.value);
        const selectedPreset = presets.find(preset => {
          return preset.id === data.value;
        });
        dispatch({
          type: "SELECT_PRESET",
          preset: selectedPreset
        });
      }}
      options={presets.map(preset => {
        return {
          key: preset.id,
          value: preset.id,
          text: preset.name
        };
      })}
    />
  );
});

AvailablePresets.propTypes = {
  presets: PropTypes.array,
  dispatch: PropTypes.func
};
