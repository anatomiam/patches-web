import styled from "styled-components";

const size = {
  mobileS: "320px",
  mobileM: "375px",
  mobileL: "425px",
  tablet: "768px",
  laptop: "1024px",
  laptopL: "1440px",
  desktop: "2560px"
};

export const DivContainer = styled.div`
  display: grid;
  grid-template-rows: 100px 100px repeat(5, minmax(75px, 125px)) 75px 75px;
  grid-template-columns: repeat(9, 1fr);
  grid-gap: 1px;
`;

export const DivPedal = styled.div`
  grid-column: 3 / 8;
  grid-row: 2 / 8;
  place-self: start center;
`;

export const DivForm = styled.div`
  grid-column: 1 / 3;
  grid-row: 1 / 8;
`;
export const DivDetails = styled.div`
  grid-column: 8 / 10;
  grid-row: 3 / 7;
`;
export const DivPedalDetails = styled.div`
  grid-column: 8 / 10;
  grid-row: 2 / 3;
`;
export const DivPedalSelector = styled.div`
  grid-column: 8 / 10;
  grid-row: 1 / 2;
  place-self: center;
`;
export const DivSubmit = styled.div`
  grid-column: 8 / 10;
  grid-row: 7 / 8;
  place-self: center end;
`;

export const DivNotes = styled.div`
  grid-column: 1 / 3;
  grid-row: 1 / 8;
`;
