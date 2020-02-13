import {
  BodyContainer,
  DivContainer,
  DivPedal,
  DivTools,
  HeaderDiv,
  NavItemDiv
} from "../PageStyles";
import { Button, Icon, Menu, Popup } from "semantic-ui-react";
import React, { useState } from "react";
import {
  addKnob,
  dragKnob,
  setOriginalKnobs,
  setPedalDetails,
  setScaleBuilder,
  startFromScratch,
  tapKnob
} from "../../../state/Actions/Actions";

import { AddIndicatorForm } from "../../Forms/Builder/AddIndicatorForm";
import { AddKnobForm } from "../../Forms/Builder/AddKnobForm";
import { AddSwitchForm } from "../../Forms/Builder/AddSwitchForm";
import AvailablePedals from "../../Forms/Shared/AvailablePedals";
import { CreatePedalButton } from "../../Forms/Builder/CreatePedalButton";
import { FloatingActionButton } from "../General/FloatingActionButton";
import { FooterMobile } from "../General/FooterMobile";
// import { ComponentInfo } from "../../Forms/Shared/ComponentInfo";
import { Pedal } from "../../DeviceComponents/Body/Pedal";
import { PedalForm } from "../../Forms/Builder/PedalForm";
import { PropTypes } from "prop-types";
import { Scaler } from "../General/Scaler";
import { UpdatePedalButton } from "../../Forms/Builder/UpdatePedalButton";
import { connect } from "react-redux";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";

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

const Builder = props => {
  const {
    data: pedalsData,
    loading: pedalsLoading,
    error: pedalsError
  } = useQuery(PEDAL_QUERY);

  const {
    builderState,
    addKnob,
    tapKnob,
    dragKnob,
    setPedalDetails,
    startFromScratch,
    setScaleBuilder,
    setOriginalKnobs
  } = props;

  const [activeItem, setActiveItem] = useState("");

  const { width, height, name, color, id } = builderState.pedalDetails;
  const { knobs, scale, isNewPedal, drag, tapKnobsIn } = builderState;

  if (pedalsLoading) return "Loading Pedals...";
  if (pedalsError) return `Loading Pedals Error! ${pedalsError}`;

  const pedals = pedalsData.pedals;

  return (
    <>
      <HeaderDiv className="mobile-only">
        <NavItemDiv>
          <Button
            circular
            size="large"
            color="red"
            icon="trash"
            className="icon-pointer"
            onClick={() => {
              startFromScratch();
              setActiveItem("");
            }}
          />
        </NavItemDiv>
        <NavItemDiv>Builder</NavItemDiv>
        <NavItemDiv>
          {isNewPedal ? (
            <CreatePedalButton
              buttonProps={{
                size: "large",
                icon: "save",
                color: "green",
                circular: true
              }}
              className="icon-pointer"
              builderState={builderState}
            />
          ) : (
            <UpdatePedalButton
              buttonProps={{
                size: "large",
                icon: "save",
                color: "green",
                circular: true
              }}
              builderState={builderState}
              setOriginalKnobs={setOriginalKnobs}
            />
          )}
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
              drag={drag}
              tapKnobsIn={tapKnobsIn}
              builder
            />
          </DivPedal>
          <DivTools className="tablet-plus">
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
                content={<AvailablePedals pedals={pedals} builder />}
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
                    setPedalDetails={setPedalDetails}
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
                content={<AddKnobForm addKnob={addKnob} />}
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
                content={<AddSwitchForm addKnob={addKnob} />}
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
                content={<AddIndicatorForm addKnob={addKnob} />}
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
              {/* needs to be a drawer */}
              <Menu.Item
                name="tap knob in"
                active={activeItem === "tap knob in"}
                onClick={() => {
                  tapKnob("knob");
                  activeItem !== "tap knob in"
                    ? setActiveItem("tap knob in")
                    : setActiveItem("");
                }}
              >
                <Icon
                  name={tapKnobsIn.isActive ? "add circle" : "times circle"}
                  className="icon-pointer"
                  color={tapKnobsIn.isActive ? "yellow" : null}
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
                      startFromScratch();
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
                    <CreatePedalButton
                      buttonProps={{
                        content: "Save Pedal",
                        color: "green",
                        size: "mini"
                      }}
                      className="icon-pointer"
                      builderState={builderState}
                    />
                  ) : (
                    <UpdatePedalButton
                      buttonProps={{
                        content: "Update Pedal",
                        color: "green",
                        size: "mini"
                      }}
                      builderState={builderState}
                      setOriginalKnobs={setOriginalKnobs}
                    />
                  )
                }
              />
            </Menu>
          </DivTools>
          {/* <DivDetails drag={true} dragMomentum={false}>
        <ComponentInfo
          knobs={knobs}
          selectedComponentId={selectedComponentId}
          selectedComponentPosition={selectedComponentPosition}
          pedalDetails={builderState.pedalDetails}
        />
      </DivDetails> */}
          <Scaler scale={scale} setScale={setScaleBuilder} />
        </DivContainer>
      </BodyContainer>
      <FloatingActionButton>
        <Popup
          id={1}
          inverted
          basic
          on="click"
          position="left center"
          style={{ marginLeft: "7px" }}
          trigger={
            <Button
              circular
              size="small"
              icon="plus square outline"
              name="pedalform"
              color={activeItem === "pedalform" ? "blue" : null}
              onClick={() =>
                activeItem !== "pedalform"
                  ? setActiveItem("pedalform")
                  : setActiveItem("")
              }
            />
          }
          content={
            <PedalForm
              id={id}
              width={width}
              height={height}
              name={name}
              color={color}
              setPedalDetails={setPedalDetails}
            />
          }
        />
        <Popup
          id={2}
          inverted
          basic
          on="click"
          position="left center"
          style={{ marginLeft: "7px" }}
          trigger={
            <Button
              size="small"
              circular
              icon="circle notch"
              name="add knob"
              color={activeItem === "add knob" ? "blue" : null}
              onClick={() =>
                activeItem !== "add knob"
                  ? setActiveItem("add knob")
                  : setActiveItem("")
              }
            />
          }
          content={<AddKnobForm addKnob={addKnob} />}
        />
        <Popup
          id={3}
          inverted
          basic
          on="click"
          position="left center"
          style={{ marginLeft: "7px" }}
          trigger={
            <Button
              size="small"
              circular
              icon="toggle on"
              name="add switch"
              color={activeItem === "add switch" ? "blue" : null}
              onClick={() =>
                activeItem !== "add switch"
                  ? setActiveItem("add switch")
                  : setActiveItem("")
              }
            />
          }
          content={<AddSwitchForm addKnob={addKnob} />}
        />
        <Popup
          id={4}
          inverted
          basic
          on="click"
          position="left center"
          style={{ marginLeft: "7px" }}
          trigger={
            <Button
              size="small"
              circular
              icon="lightbulb"
              name="add indicator"
              color={activeItem === "add indicator" ? "blue" : null}
              onClick={() =>
                activeItem !== "add indicator"
                  ? setActiveItem("add indicator")
                  : setActiveItem("")
              }
            />
          }
          content={<AddIndicatorForm addKnob={addKnob} />}
        />
        <Button
          id={5}
          circular
          icon={tapKnobsIn.isActive ? "add circle" : "times circle"}
          active={activeItem === "tap knob in"}
          className="icon-pointer"
          color={tapKnobsIn.isActive ? "yellow" : null}
          onClick={() => {
            tapKnob("knob");
            activeItem !== "tap knob in"
              ? setActiveItem("tap knob in")
              : setActiveItem("");
          }}
        />
        <Button
          id={6}
          circular
          icon={drag ? "hand rock" : "hand paper"}
          active={activeItem === "drag knob"}
          onClick={() => {
            dragKnob();
            activeItem !== "drag knob"
              ? setActiveItem("drag knob")
              : setActiveItem("");
          }}
          className="icon-pointer"
          color={drag ? "orange" : null}
        />
      </FloatingActionButton>
      <FooterMobile>
        <AvailablePedals pedals={pedals} builder />
      </FooterMobile>
    </>
  );
};

Builder.propTypes = {
  pedals: PropTypes.array,
  builderState: PropTypes.object,
  addKnob: PropTypes.func,
  tapKnob: PropTypes.func,
  dragKnob: PropTypes.func,
  setPedalDetails: PropTypes.func,
  startFromScratch: PropTypes.func,
  setScaleBuilder: PropTypes.func,
  setOriginalKnobs: PropTypes.func
};

const mapStateToProps = state => {
  return {
    builderState: state.builderState
  };
};

const mapDispatchToProps = {
  addKnob,
  tapKnob,
  dragKnob,
  setPedalDetails,
  setScaleBuilder,
  setOriginalKnobs,
  startFromScratch
};

export default connect(mapStateToProps, mapDispatchToProps)(Builder);
