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
  grid-column: 1 / 6;
  place-self: start center;
  @media only screen and (min-width: ${size.tablet}) {
    grid-column: 4 / 8;
    grid-row: 1 / 13;
  }
  @media only screen and (min-width: ${size.laptop}) {
    grid-column: 4 / 10;
  }
`;

export const DivTools = styled.div`
  grid-column: 1 / 6;
  place-self: start center;
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(3, minmax(75px, 125px));
  @media only screen and (min-width: ${size.tablet}) {
    grid-column: 1 / 4;
    grid-row: 1 / 13;
    grid-template-rows: repeat(12, minmax(25px, 100px));
  }
`;

export const DivForm = styled.div`
  grid-column: 1 / 4;
  @media only screen and (min-width: ${size.tablet}) {
    grid-column: 1 / 4;
    grid-row: 2 / 7;
  }
`;

export const DivDetails = styled.div`
  grid-column: 1 / 4;
  @media only screen and (min-width: ${size.tablet}) {
    grid-column: 1 / 4;
    grid-row: 7 / 9;
  }
`;

export const DivPedalDetails = styled.div`
  grid-column: 1 / 4;
  @media only screen and (min-width: ${size.tablet}) {
    grid-column: 1 / 4;
    grid-row: 9 / 11;
  }
`;

export const DivPedalSelector = styled.div`
  grid-column: 1 / 4;
  place-self: center;
  @media only screen and (min-width: ${size.tablet}) {
    grid-column: 1 / 4;
    grid-row: 1 / 2;
  }
`;

export const DivSubmit = styled.div`
  grid-column: 1 / 4;
  place-self: center end;
  @media only screen and (min-width: ${size.tablet}) {
    grid-column: 1 / 4;
    grid-row: 11 / 12;
  }
`;

export const DivNotes = styled.div`
  grid-column: 1 / 4;
  @media only screen and (min-width: ${size.tablet}) {
    grid-column: 1 / 4;
    grid-row: 2 / 7;
  }
`;
