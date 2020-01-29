import "../../../index.css";

import { FooterMobile } from "./FooterMobile";
import React from "react";
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

const Landing = () => {
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
        </BodyDiv>
      </BodyContainer>
      <FooterMobile>
        <div>THing</div>
      </FooterMobile>
    </>
  );
};

export default Landing;
