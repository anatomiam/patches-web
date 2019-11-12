import React, { useState } from "react";
import { Dropdown } from "semantic-ui-react";
import { PropTypes } from "prop-types";
import { selectPedal } from "../../../state/Actions/Actions";
import { connect } from "react-redux";

const AvailablePedals = React.memo(props => {
  console.log(props);
  const { pedals, selectPedal } = props;
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
        selectPedal(id, name, width, height, color, knobs, patchDetails);
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
  selectPedal: PropTypes.func
};

const mapStateToProps = state => ({});

const mapDispatchToProps = {
  selectPedal
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AvailablePedals);
