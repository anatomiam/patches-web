import React, { useState } from "react";
import { PropTypes } from "prop-types";
import { AddKnobForm } from "../../Forms/Builder/AddKnobForm";
import { AddIndicatorForm } from "../../Forms/Builder/AddIndicatorForm";
import { AddSwitchForm } from "../../Forms/Builder/AddSwitchForm";
import AvailablePedals from "../../Forms/Shared/AvailablePedals";
import { ComponentInfo } from "../../Forms/Shared/ComponentInfo";
import { Pedal } from "../../DeviceComponents/Body/Pedal";
import { PedalForm } from "../../Forms/Builder/PedalForm";
import { useStateValue } from "../../../state/StateProvider";
import { addKnob, tapKnob, dragKnob } from "../../../state/actions/actions";
import { CreatePedalButton } from "../../Forms/Builder/CreatePedalButton";
import { UpdatePedalButton } from "../../Forms/Builder/UpdatePedalButton";
import { Scaler } from "../General/Scaler";
import { Icon, Menu, Button, Popup } from "semantic-ui-react";
import { DivContainer, DivDetails, DivPedal, DivTools } from "../PageStyles";
import { connect } from "react-redux";

const Builder = props => {
  const { pedals, localState, addKnob, tapKnob, dragKnob } = props;
  const [, dispatch] = useStateValue();
  const [activeItem, setActiveItem] = useState("");
  const { width, height, name, color, id } = localState.pedalDetails;
  const {
    knobs,
    scale,
    isNewPedal,
    selectedComponentId,
    selectedComponentPosition,
    drag,
    tapKnobsIn
  } = localState;

  return (
    <DivContainer>
      <DivPedal scale={scale}>
        <Pedal
          knobs={knobs}
          width={width}
          height={height}
          color={color}
          addKnob={addKnob}
          drag={drag}
          tapKnobsIn={tapKnobsIn}
          builder
        />
      </DivPedal>
      <DivTools>
        <Menu icon vertical borderless inverted>
          <Popup
            inverted
            basic
            on="click"
            offset="50px, -50px"
            style={{ marginLeft: "7px" }}
            trigger={
              <Menu.Item
                name="select pedal"
                color="blue"
                active={activeItem === "select pedal"}
                onClick={() =>
                  activeItem !== "select pedal"
                    ? setActiveItem("select pedal")
                    : setActiveItem("")
                }
              >
                <Icon name="folder" />
              </Menu.Item>
            }
            content={<AvailablePedals pedals={pedals} />}
          />
          <Popup
            inverted
            basic
            on="click"
            offset="50px, -50px"
            style={{ marginLeft: "7px" }}
            trigger={
              <Menu.Item
                name="pedalform"
                color="blue"
                active={activeItem === "pedalform"}
                onClick={() =>
                  activeItem !== "pedalform"
                    ? setActiveItem("pedalform")
                    : setActiveItem("")
                }
              >
                <Icon name="plus square outline" />
              </Menu.Item>
            }
            content={
              <PedalForm
                id={id}
                width={width}
                height={height}
                name={name}
                color={color}
                dispatch={dispatch}
              />
            }
          />
          <Popup
            inverted
            basic
            on="click"
            offset="50px, -50px"
            style={{ marginLeft: "7px" }}
            trigger={
              <Menu.Item
                name="add knob"
                color="blue"
                active={activeItem === "add knob"}
                onClick={() =>
                  activeItem !== "add knob"
                    ? setActiveItem("add knob")
                    : setActiveItem("")
                }
              >
                <Icon name="circle notch" />
              </Menu.Item>
            }
            content={<AddKnobForm dispatch={dispatch} />}
          />
          <Popup
            inverted
            basic
            on="click"
            offset="50px, -50px"
            style={{ marginLeft: "7px" }}
            trigger={
              <Menu.Item
                name="add switch"
                color="blue"
                active={activeItem === "add switch"}
                onClick={() =>
                  activeItem !== "add switch"
                    ? setActiveItem("add switch")
                    : setActiveItem("")
                }
              >
                <Icon name="toggle on" />
              </Menu.Item>
            }
            content={<AddSwitchForm dispatch={dispatch} />}
          />
          <Popup
            inverted
            basic
            on="click"
            offset="50px, -50px"
            style={{ marginLeft: "7px" }}
            trigger={
              <Menu.Item
                name="add indicator"
                color="blue"
                active={activeItem === "add indicator"}
                onClick={() =>
                  activeItem !== "add indicator"
                    ? setActiveItem("add indicator")
                    : setActiveItem("")
                }
              >
                <Icon name="lightbulb" />
              </Menu.Item>
            }
            content={<AddIndicatorForm dispatch={dispatch} />}
          />
          <Menu.Item
            name="drag knob"
            active={activeItem === "drag knob"}
            onClick={() => {
              dragKnob();
              activeItem !== "drag knob"
                ? setActiveItem("drag knob")
                : setActiveItem("");
            }}
          >
            <Icon
              name={drag ? "hand rock" : "hand paper"}
              className="icon-pointer"
              color={drag ? "orange" : null}
            />
          </Menu.Item>
          <Menu.Item
            name="tap knob in"
            active={activeItem === "tap knob in"}
            onClick={() => {
              tapKnob();
              activeItem !== "tap knob in"
                ? setActiveItem("tap knob in")
                : setActiveItem("");
            }}
          >
            <Icon
              name={tapKnobsIn ? "add circle" : "times circle"}
              className="icon-pointer"
              color={tapKnobsIn ? "yellow" : null}
            />
          </Menu.Item>
          <Popup
            inverted
            basic
            on="click"
            offset="50px, -50px"
            style={{ marginLeft: "7px" }}
            trigger={
              <Menu.Item
                name="start over"
                active={activeItem === "start over"}
                onClick={() => setActiveItem("start over")}
              >
                <Icon name="trash" className="icon-pointer" />
              </Menu.Item>
            }
            content={
              <Button
                size="mini"
                color="red"
                content="Start from scratch?"
                onClick={() => {
                  dispatch({
                    type: "START_FROM_SCRATCH"
                  });
                  setActiveItem("");
                }}
              />
            }
          />
          <Popup
            inverted
            basic
            on="click"
            offset="50px, -50px"
            style={{ marginLeft: "7px" }}
            trigger={
              <Menu.Item
                name="save"
                active={activeItem === "save"}
                onClick={() => setActiveItem("save")}
              >
                <Icon name="save" className="icon-pointer" />
              </Menu.Item>
            }
            content={
              isNewPedal ? (
                <CreatePedalButton localState={localState} />
              ) : (
                <UpdatePedalButton localState={localState} />
              )
            }
          />
        </Menu>
      </DivTools>
      <DivDetails drag={true} dragMomentum={false}>
        <ComponentInfo
          knobs={knobs}
          selectedComponentId={selectedComponentId}
          selectedComponentPosition={selectedComponentPosition}
          pedalDetails={localState.pedalDetails}
        />
      </DivDetails>
      <Scaler scale={scale} dispatch={dispatch} />
    </DivContainer>
  );
};

Builder.propTypes = { pedals: PropTypes.array };

const mapStateToProps = state => {
  return {
    localState: state.localState
  };
};

const mapDispatchToProps = { addKnob, tapKnob, dragKnob };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Builder);
