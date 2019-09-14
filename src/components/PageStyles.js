import styled from "styled-components";

const size = {
  mobileS: "320px",
  // mobileM: "375px",
  // mobileL: "425px",
  tablet: "768px",
  laptop: "1024px"
  // laptopL: "1440px",
  // desktop: "2560px"
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
  display: grid;
  grid-gap: 5px;
  grid-template-columns: repeat(5, minmax(65px, 155px));
  @media only screen and (min-width: ${size.tablet}) {
    grid-template-columns: 100px 100px repeat(5, minmax(75px, 125px));
    grid-template-rows: repeat(12, minmax(25px, 100px));
  }
  @media only screen and (min-width: ${size.laptop}) {
    grid-template-columns: 100px 100px repeat(5, minmax(75px, 125px)) 75px 75px;
  }
`;

export const DivPedal = styled.div`
  grid-column: 1 / 6;
  place-self: start center;
  @media only screen and (min-width: ${size.tablet}) {
    grid-column: 3 / 8;
    grid-row: 2 / 8;
  }
`;

export const DivForm = styled.div`
  grid-column: 1 / 6;
  @media only screen and (min-width: ${size.tablet}) {
    grid-column: 1 / 3;
    grid-row: 1 / 8;
  }
`;
export const DivDetails = styled.div`
  grid-column: 1 / 6;
  @media only screen and (min-width: ${size.tablet}) {
    grid-column: 3 / 8;
    grid-row: 2 / 8;
  }
  @media only screen and (min-width: ${size.laptop}) {
    grid-column: 8 / 10;
    grid-row: 3 / 7;
  }
`;

export const DivPedalDetails = styled.div`
  grid-column: 1 / 6;
  @media only screen and (min-width: ${size.tablet}) {
    grid-column: 3 / 8;
    grid-row: 8 / 12;
  }
  @media only screen and (min-width: ${size.laptop}) {
    grid-column: 1 / 3;
    grid-row: 8 / 10;
  }
`;

export const DivPedalSelector = styled.div`
  grid-column: 1 / 6;
  place-self: center;
  @media only screen and (min-width: ${size.tablet}) {
    grid-column: 5 / 8;
    grid-row: 1 / 2;
  }
  @media only screen and (min-width: ${size.laptop}) {
    grid-column: 8 / 10;
    grid-row: 1 / 2;
  }
`;

export const DivSubmit = styled.div`
  grid-column: 1 / 6;
  place-self: center end;
  @media only screen and (min-width: ${size.tablet}) {
    /* grid-column: 3 / 8;
    grid-row: 2 / 8; */
  }
  @media only screen and (min-width: ${size.laptop}) {
    grid-column: 8 / 10;
    grid-row: 7 / 8;
  }
`;

export const DivNotes = styled.div`
  grid-column: 1 / 6;
  @media only screen and (min-width: ${size.tablet}) {
    /* grid-column: 3 / 8;
    grid-row: 2 / 8; */
  }
  @media only screen and (min-width: ${size.laptop}) {
    grid-column: 1 / 3;
    grid-row: 1 / 8;
  }
`;
