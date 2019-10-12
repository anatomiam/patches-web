import React, { useState } from "react";
import "../../../index.css";
import styled from "styled-components";
import { motion } from "framer-motion";
import { Menu, Icon, Popup } from "semantic-ui-react";
import { PedalForm } from "../../Forms/Builder/PedalForm";

const DIV = styled(motion.div)`
  padding: 5px;
`;

const Landing = () => {
  const [activeItem, setActiveItem] = useState("");
  return (
    <DIV>
      <Menu icon vertical borderless pointing inverted>
        <Popup
          inverted
          basic
          on="click"
          offset="50px, -50px"
          style={{ marginLeft: "7px" }}
          trigger={
            <Menu.Item
              name="gamepad"
              active={activeItem === "gamepad"}
              onClick={() =>
                activeItem !== "gamepad"
                  ? setActiveItem("gamepad")
                  : setActiveItem("")
              }
            >
              <Icon name="gamepad" />
            </Menu.Item>
          }
          content={<PedalForm />}
        />

        <Menu.Item
          name="video camera"
          active={activeItem === "video camera"}
          onClick={() =>
            activeItem !== "video camera"
              ? setActiveItem("video camera")
              : setActiveItem("")
          }
        >
          <Icon name="video camera" />
        </Menu.Item>
        <Menu.Item
          name="video play"
          active={activeItem === "video play"}
          onClick={() =>
            activeItem !== "video play"
              ? setActiveItem("video play")
              : setActiveItem("")
          }
        >
          <Icon name="video play" />
        </Menu.Item>
      </Menu>
    </DIV>
  );
};

export default Landing;
