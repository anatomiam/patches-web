import { motion } from "framer-motion";
import styled from "styled-components";

const size = {
  mobileS: "320px",
  tablet: "768px",
  laptop: "1024px"
};

export const InputColorPicker = styled.input`
  width: 50%;
`;

export const DivLabeledColorPicker = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const DivContainer = styled.div`
  margin: 10px;
  display: grid;
  grid-gap: 5px;
  grid-template-columns: repeat(5, minmax(65px, 155px));
  @media only screen and (min-width: ${size.tablet}) {
    grid-template-columns: repeat(7, minmax(75px, 125px));
    grid-template-rows: repeat(12, minmax(25px, 100px));
  }
  @media only screen and (min-width: ${size.laptop}) {
    grid-template-columns: repeat(9, minmax(75px, 125px));
  }
`;

export const DivPedal = styled.div`
  transform: ${props => `scale(${props.scale})`};
  grid-column: 1 / 6;
  place-self: start center;
  @media only screen and (min-width: ${size.tablet}) {
    grid-column: 2 / 8;
    grid-row: 1 / 13;
  }
  @media only screen and (min-width: ${size.laptop}) {
    grid-column: 2 / 10;
  }
`;

export const DivTools = styled.div`
  grid-column: 1 / 6;
  position: fixed;
  top: 100px;
  left: 5px;
  @media only screen and (min-width: ${size.tablet}) {
    grid-column: 1 / 2;
    grid-row: 1 / 13;
  }
`;

export const DivForm = styled.div``;

export const DivDetails = styled(motion.div)`
  z-index: 10;
  grid-column: 1 / 6;
  grid-row: 4;
  @media only screen and (min-width: ${size.tablet}) {
    grid-column: 7 / 9;
    grid-row: 1;
  }
  @media only screen and (min-width: ${size.laptop}) {
    grid-column: 8 / 10;
  }
`;

export const DivPedalDetails = styled.div``;

export const DivPedalSelector = styled.div``;

export const DivSubmit = styled.div``;
export const DivNotes = styled.div``;
