import "../../../index.css";

import { Button, Dropdown } from "semantic-ui-react";
import React, { useState } from "react";

import { motion } from "framer-motion";
import styled from "styled-components";

const size = {
  mobileS: "320px",
  tablet: "768px",
  laptop: "1024px"
};

const BodyContainer = styled.div`
  overflow: hidden;
  padding-top: 75px;
  padding-bottom: 75px;
  border: 1px solid black;
  display: flex;
  /* grid-template-columns: repeat(5, minmax(65px, 155px)); */
  /* grid-template-rows: repeat(12, minmax(25px, 100px)); */

  /* @media only screen and (min-width: ${size.tablet}) {
    grid-template-columns: repeat(7, minmax(75px, 125px));
    grid-template-rows: repeat(12, minmax(25px, 100px));
  }
  @media only screen and (min-width: ${size.laptop}) {
    grid-template-columns: repeat(9, minmax(75px, 125px));
  } */
`;

const HeaderDiv = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  height: 75px;
  width: 100%;
  z-index: 5;
  background-color: blue;
  border: 1px solid blue;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const BodyDiv = styled.div`
  border: 1px solid red;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const FooterDiv = styled.div`
  width: 100%;
  height: 75px;
  position: fixed;
  bottom: 0px;
  margin: 0;
  z-index: 5;
  background-color: blue;
  border: 1px solid blue;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const variants = {
  closed: { height: 0 },
  open: { height: "300px" }
};

const BottomDrawerDiv = styled(motion.div)`
  z-index: 4;
  width: 100%;
  padding-bottom: 75px;
  background-color: rgba(201, 76, 76, 0.3);
  border: 1px solid maroon;
  position: fixed;
  bottom: 0px;
  display: flex;
  flex-direction: column;
`;

const NavItemDiv = styled.div`
  border: 1px solid green;
  margin: 5px;
  min-width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DescriptionDiv = styled.div`
  border: 1px solid purple;
  margin: 15px;
  min-height: 50px;
`;
const fabVariants = {
  open: {
    scale: 1,
    transition: { staggerChildren: 0.05, delayChildren: 0.0 }
  },
  closed: {
    scale: 0,
    transition: { staggerChildren: 0.05, staggerDirection: -1, delay: 0.5 }
  }
};

const liVariants = {
  open: {
    scale: 1,
    y: 0,
    opacity: 1
  },
  closed: {
    scale: 0,
    y: 50,
    opacity: 1
  }
};

const itemIds = [0, 1, 2, 3, 4];

const Landing = () => {
  const [isOpen, setIsOpen] = useState(0);
  return (
    <>
      <HeaderDiv>
        <NavItemDiv>Hey 1</NavItemDiv>
        <NavItemDiv>Pedal Name</NavItemDiv>
        <NavItemDiv>Hey 3</NavItemDiv>
      </HeaderDiv>
      <BodyContainer>
        <BodyDiv>
          <DescriptionDiv>
            <p>
              Suspendisse sodales laoreet nisl. Pellentesque luctus nulla sed
              nulla euismod varius. Integer non pulvinar enim. Fusce rhoncus
              faucibus aliquam. Donec facilisis lectus dolor, ac mattis arcu
              semper et.
            </p>
          </DescriptionDiv>
          <h2>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
            eget tortor leo. Vestibulum justo massa, volutpat et magna vitae,
            convallis consequat leo. Etiam facilisis justo tempor erat gravida
            imperdiet. Integer bibendum neque augue, in lacinia orci rhoncus
            non. Fusce molestie, felis a eleifend mollis, neque lacus placerat
            nibh, id ultricies urna quam et turpis. Donec auctor sapien tortor,
            sit amet rutrum tellus consequat placerat. Quisque nisi mauris,
            sagittis sed enim vitae, ultrices placerat lectus. Nam non felis
            ultrices, facilisis purus ut, faucibus nisi. Fusce nunc neque,
            dignissim vel sem in, gravida luctus nisl.
          </p>
          <motion.div
            animate={isOpen == 3 ? "open" : "closed"}
            variants={fabVariants}
            style={{
              bottom: "200px",
              position: "fixed",
              margin: "1em",
              right: "200px"
            }}
          >
            {itemIds.map(i => (
              <motion.div style={{}} variants={liVariants} key={i}>
                <Button
                  // disabled={isOpen == 3 ? true : false}
                  circular
                  icon="car"
                />
              </motion.div>
            ))}
          </motion.div>
        </BodyDiv>
      </BodyContainer>
      <FooterDiv>
        <NavItemDiv>
          <Button
            circular
            onClick={() => setIsOpen(isOpen == 1 ? 0 : 1)}
            icon="world"
          />
        </NavItemDiv>
        <NavItemDiv>
          <Button
            circular
            onClick={() => setIsOpen(isOpen == 2 ? 0 : 2)}
            icon="world"
          />
        </NavItemDiv>
        <NavItemDiv>
          <Button
            circular
            onClick={() => setIsOpen(isOpen == 3 ? 0 : 3)}
            icon="world"
          />
        </NavItemDiv>
        <NavItemDiv>
          <Button
            circular
            onClick={() => setIsOpen(isOpen == 4 ? 0 : 4)}
            icon="world"
          />
        </NavItemDiv>
      </FooterDiv>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <BottomDrawerDiv
          animate={isOpen == 1 ? "open" : "closed"}
          variants={variants}
        >
          <Button type="submit" color="violet">
            Login
          </Button>
        </BottomDrawerDiv>
        <BottomDrawerDiv
          animate={isOpen == 2 ? "open" : "closed"}
          variants={variants}
        >
          <Button fluid type="submit" color="violet">
            Do the thing
          </Button>
          <Dropdown
            placeholder="More"
            fluid
            open
            selection
            options={[
              {
                text: "ONE",
                value: 1
              },
              {
                text: "TWO",
                value: 2
              },
              {
                text: "THREE",
                value: 3
              },
              {
                text: "FOUR",
                value: 4
              }
            ]}
          />
        </BottomDrawerDiv>
        <BottomDrawerDiv
          animate={isOpen == 2 ? "open" : "closed"}
          variants={variants}
        >
          click me 3
        </BottomDrawerDiv>
        <BottomDrawerDiv
          animate={isOpen == 4 ? "open" : "closed"}
          variants={variants}
        >
          click me 4
        </BottomDrawerDiv>
      </div>
    </>
  );
};

export default Landing;
