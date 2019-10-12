import React, { useState } from "react";
import { PropTypes } from "prop-types";
import { AddKnobForm } from "../../Forms/Builder/AddKnobForm";
import { AddIndicatorForm } from "../../Forms/Builder/AddIndicatorForm";
import { AddSwitchForm } from "../../Forms/Builder/AddSwitchForm";
import { AvailablePedals } from "../../Forms/Shared/AvailablePedals";
import { ComponentInfo } from "../../Forms/Shared/ComponentInfo";
import { Pedal } from "../../DeviceComponents/Body/Pedal";
import { PedalForm } from "../../Forms/Builder/PedalForm";
import { useStateValue } from "../../../state/StateProvider";
import { CreatePedalButton } from "../../Forms/Builder/CreatePedalButton";
import { UpdatePedalButton } from "../../Forms/Builder/UpdatePedalButton";
import { StartFromScratchButton } from "../../Forms/Builder/StartFromScratchButton";
import { Scaler } from "../General/Scaler";
import { Icon, Menu, Popup } from "semantic-ui-react";
import {
  DivContainer,
  DivDetails,
  DivPedal,
  DivSubmit,
  DivTools
} from "../PageStyles";

const Builder = ({ pedals }) => {
  const [{ localState }, dispatch] = useStateValue();
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
          dispatch={dispatch}
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
            content={<AvailablePedals pedals={pedals} dispatch={dispatch} />}
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
              dispatch({
                type: "DRAG_KNOB"
              });
              activeItem !== "drag knob"
                ? setActiveItem("drag knob")
                : setActiveItem("");
            }}
          >
            <Icon
              name={drag ? "hand rock" : "hand paper"}
              className="icon-pointer"
              color={drag ? "orange" : "white"}
            />
          </Menu.Item>
          <Menu.Item
            name="tap knob in"
            active={activeItem === "tap knob in"}
            onClick={() => {
              dispatch({
                type: "TAP_KNOB"
              });
              activeItem !== "tap knob in"
                ? setActiveItem("tap knob in")
                : setActiveItem("");
            }}
          >
            <Icon
              name={tapKnobsIn ? "add circle" : "times circle"}
              className="icon-pointer"
              color={tapKnobsIn ? "yellow" : "white"}
            />
          </Menu.Item>
        </Menu>

        <Scaler scale={scale} dispatch={dispatch} />
        <DivDetails>
          <ComponentInfo
            knobs={knobs}
            dispatch={dispatch}
            selectedComponentId={selectedComponentId}
            selectedComponentPosition={selectedComponentPosition}
            pedalDetails={localState.pedalDetails}
          />
        </DivDetails>
        <DivSubmit>
          {isNewPedal ? (
            <CreatePedalButton localState={localState} />
          ) : (
            <UpdatePedalButton localState={localState} />
          )}
        </DivSubmit>
        <DivSubmit>
          <StartFromScratchButton dispatch={dispatch} />
        </DivSubmit>
      </DivTools>
    </DivContainer>
  );
};

Builder.propTypes = { pedals: PropTypes.array };

export default Builder;
