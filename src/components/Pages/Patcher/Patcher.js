import "../../../index.css";

import {
  BodyContainer,
  DivContainer,
  DivNotes,
  DivPedal,
  DivPedalSelector,
  DivTools,
  HeaderDiv,
  NavItemDiv
} from "../PageStyles";
import {
  addKnob,
  selectPreset,
  setPatchDetails,
  setScale
} from "../../../state/Actions/Actions";

import AvailablePedals from "../../Forms/Shared/AvailablePedals";
import { AvailablePresets } from "../../Forms/Patcher/AvailablePresets";
import { Button } from "semantic-ui-react";
import { FooterMobile } from "../General/FooterMobile";
// import { ComponentInfo } from "../../Forms/Shared/ComponentInfo";
import { PatchForm } from "../../Forms/Patcher/PatchForm";
import { Pedal } from "../../DeviceComponents/Body/Pedal";
import { PropTypes } from "prop-types";
import React from "react";
import { Scaler } from "../General/Scaler";
import { connect } from "react-redux";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";

const PRESET_QUERY = gql`
  query PresetsByUser($userId: ID!) {
    presetsByUser(userId: $userId) {
      id
      description
      name
      pedal {
        id
      }
      patches {
        id
        knob {
          id
        }
        position
        notes
      }
    }
  }
`;

const PEDAL_QUERY = gql`
  query {
    pedals {
      id
      name
      width
      height
      color
      knobs {
        id
        type
        description
        color
        cx
        cy
        r
        position
        steps
        width
      }
    }
  }
`;

const Patcher = props => {
  const {
    patcherState,
    sharedState,
    addKnob,
    selectPreset,
    setScale,
    setPatchDetails
  } = props;
  const { userId } = sharedState;
  const {
    data: pedalsData,
    loading: pedalsLoading,
    error: pedalsError
  } = useQuery(PEDAL_QUERY);
  const {
    data: presetsData,
    loading: presetsLoading,
    error: presetsError
  } = useQuery(PRESET_QUERY, {
    variables: { userId }
  });
  const { width, height, color } = patcherState.pedalDetails;
  const {
    knobs,
    scale,
    tapKnobsIn,
    patchDetails,
    selectedComponentId,
    pedalDetails
  } = patcherState;

  if (pedalsLoading) return "Loading Pedals...";
  if (pedalsError) return `Loading Pedals Error! ${pedalsError}`;
  if (presetsLoading) return "Loading Presets...";
  if (presetsError) return `Loading Presets Error! ${presetsError}`;

  const pedals = pedalsData.pedals;
  const presets = presetsData.presetsByUser;
  console.log(presets);

  const pedalPresets = presets.filter(preset => {
    return preset.pedal.id === patcherState.pedalDetails.id;
  });

  return (
    <>
      <HeaderDiv>
        <NavItemDiv>
          <Button
            circular
            size="large"
            color="red"
            icon="trash"
            className="icon-pointer"
            onClick={() => {}}
          />
        </NavItemDiv>
        <NavItemDiv>Patcher</NavItemDiv>
        <NavItemDiv>
          <Button
            circular
            size="large"
            color="green"
            icon="save"
            className="icon-pointer"
            onClick={() => {}}
          />
        </NavItemDiv>
      </HeaderDiv>
      <BodyContainer>
        <DivContainer>
          <DivPedal scale={scale}>
            <Pedal
              knobs={knobs}
              width={width}
              height={height}
              color={color}
              addKnob={addKnob}
              tapKnobsIn={tapKnobsIn}
              patcher
            />
          </DivPedal>
          <DivTools>
            <DivPedalSelector>
              <AvailablePedals pedals={pedals} />
              <AvailablePresets
                presets={pedalPresets}
                selectPreset={selectPreset}
              />
            </DivPedalSelector>
            <Scaler scale={scale} setScale={setScale} />
            <DivNotes>
              <PatchForm
                userId={userId}
                pedalId={pedalDetails.id}
                patchDetails={patchDetails}
                setPatchDetails={setPatchDetails}
                knobs={knobs}
                selectedComponentId={selectedComponentId}
              />
            </DivNotes>
            {/* <DivDetails>
          <ComponentInfo
            knobs={knobs}
            selectedComponentId={selectedComponentId}
            selectedComponentPosition={selectedComponentPosition}
            pedalDetails={patcherState.pedalDetails}
          />
        </DivDetails> */}
          </DivTools>
        </DivContainer>
      </BodyContainer>
      <FooterMobile>
        <p>Patcher Content</p>
      </FooterMobile>
    </>
  );
};

Patcher.propTypes = {
  pedals: PropTypes.array,
  presets: PropTypes.array,
  patcherState: PropTypes.object,
  sharedState: PropTypes.object,
  addKnob: PropTypes.func,
  selectPreset: PropTypes.func,
  setScale: PropTypes.func,
  setPatchDetails: PropTypes.func
};

const mapStateToProps = state => {
  return {
    patcherState: state.patcherState,
    sharedState: state.sharedState
  };
};

const mapDispatchToProps = { addKnob, selectPreset, setScale, setPatchDetails };

export default connect(mapStateToProps, mapDispatchToProps)(Patcher);
