import React, { useState } from "react";
import {
  selectPedal,
  selectPedalBuilder
} from "../../../state/Actions/Actions";

import { Dropdown } from "semantic-ui-react";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";

const AvailablePedals = React.memo(props => {
  const { pedals, builder, selectPedal, selectPedalBuilder } = props;
  const [selectedPedalName, setSelectedPedalName] = useState("");

  return (
    <Dropdown
      search
      selection
      placeholder="-- Select a Pedal --"
      value={selectedPedalName}
      onChange={(e, data) => {
        setSelectedPedalName(data.value);
        const selectedPedal = pedals.find(pedal => {
          return pedal.id === data.value;
        });
        const {
          id,
          name,
          width,
          height,
          color,
          knobs,
          patchDetails
        } = selectedPedal;

        builder
          ? selectPedalBuilder(
              id,
              name,
              width,
              height,
              color,
              knobs,
              patchDetails
            )
          : selectPedal(id, name, width, height, color, knobs, patchDetails);
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
  selectPedal: PropTypes.func,
  selectPedalBuilder: PropTypes.func,
  builder: PropTypes.bool,
  patcher: PropTypes.bool
};
AvailablePedals.displayName = "AvailablePedals";

const mapStateToProps = () => ({});

const mapDispatchToProps = {
  selectPedal,
  selectPedalBuilder
};

export default connect(mapStateToProps, mapDispatchToProps)(AvailablePedals);
