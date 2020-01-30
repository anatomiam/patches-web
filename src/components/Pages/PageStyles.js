import { motion } from "framer-motion";
import styled from "styled-components";

const size = {
  mobileS: "320px",
  tablet: "768px",
  laptop: "1024px"
};

export const FooterDiv = styled.div`
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

export const BottomDrawerDiv = styled(motion.div)`
  z-index: 4;
  width: 100%;
  padding-bottom: 75px;
  background-color: grey;
  border: 1px solid maroon;
  position: fixed;
  bottom: 0px;
  display: flex;
  flex-direction: column;
`;

export const bottomDrawerVariants = {
  closed: { height: 0 },
  open: { height: "300px" }
};

export const HeaderDiv = styled.div`
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

export const NavItemDiv = styled.div`
  border: 1px solid green;
  margin: 5px;
  min-width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const InputColorPicker = styled.input`
  width: 50%;
`;

export const DivLabeledColorPicker = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const BodyContainer = styled.div`
  /* overflow: hidden; */
  padding-top: 75px;
  padding-bottom: 75px;
  border: 1px solid black;
  display: flex;
`;

export const DivContainer = styled.div`
  border: 1px solid red;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: start;
  /* @media only screen and (min-width: ${size.tablet}) {
    grid-template-columns: repeat(7, minmax(75px, 125px));
    grid-template-rows: repeat(12, minmax(25px, 100px));
  }
  @media only screen and (min-width: ${size.laptop}) {
    grid-template-columns: repeat(9, minmax(75px, 125px));
  } */
`;

export const DivPedal = styled.div`
  transform: ${props => `scale(${props.scale})`};
  margin: 15px;
  display: flex;
  justify-content: center;

  /* @media only screen and (min-width: ${size.tablet}) {
    grid-column: 2 / 8;
    grid-row: 1 / 13;
  }
  @media only screen and (min-width: ${size.laptop}) {
    grid-column: 2 / 10;
  } */
`;

export const DivTools = styled.div`
  grid-column: 1 / 6;
  position: fixed;
  top: 100px;
  left: 5px;
`;

export const DivForm = styled.div``;

export const DivDetails = styled.div``;

export const DivPedalDetails = styled.div``;

export const DivPedalSelector = styled.div``;

export const DivSubmit = styled.div``;
export const DivNotes = styled.div``;
