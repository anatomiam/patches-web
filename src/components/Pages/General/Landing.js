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
    transition: { staggerChildren: 0.00, delayChildren: 0 }
  },
  closed: {
    transition: { staggerChildren: 0.00, staggerDirection: -1 }
  }
};

const liVariants = {
  open: {
    // y: 0,
    x: 0,
    // display: "block",

    // position: "static",
    // bottom: 400,
    opacity: 1,
    transition: {
      y: { stiffness: 500, velocity: -100 }
    }
  },
  closed: {
    // y: 50,
    x: 100,
    // display: "none",
    // position: "fixed",
    // bottom: 0,
    opacity: 1,
    transition: {
      y: { stiffness: -500 }
    }
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
          <p>
            Maecenas dapibus urna in ligula dignissim sodales. Suspendisse
            rhoncus justo eu tempus fermentum. Sed eget rutrum nisi. Nulla
            aliquam ut nunc vitae mattis. Duis congue, risus et semper ultrices,
            erat sapien imperdiet justo, a eleifend massa sapien non orci. Nunc
            tincidunt, arcu vitae commodo pulvinar, mi orci eleifend lectus, non
            iaculis dui dolor a eros. Nullam ac sem sit amet ipsum convallis
            tempus. Curabitur interdum mollis enim eget molestie. Nulla tellus
            sem, dignissim in dui et, laoreet dignissim neque.
          </p>
          <h2>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</h2>
          <p>
            Suspendisse sodales laoreet nisl. Pellentesque luctus nulla sed
            nulla euismod varius. Integer non pulvinar enim. Fusce rhoncus
            faucibus aliquam. Donec facilisis lectus dolor, ac mattis arcu
            semper et. Ut vel auctor ipsum. Aliquam non viverra tortor, sit amet
            fringilla odio. Maecenas at justo nec neque suscipit blandit in sit
            amet felis. Sed tristique varius nibh eget pellentesque. Curabitur
            sed luctus lectus. Duis in ultricies mi.
          </p>
          <p>
            Praesent pretium quis diam sed blandit. Curabitur euismod tortor
            magna, at mattis massa molestie quis. Nulla vulputate faucibus elit,
            eu semper est iaculis sed. Quisque sed commodo dolor. Quisque
            egestas tincidunt varius. Fusce sed diam vel lacus venenatis
            fermentum. Maecenas consequat nulla vel rhoncus faucibus. Vivamus
            vehicula egestas risus vitae finibus. Nullam in viverra odio. Sed
            commodo, ligula sit amet accumsan bibendum, purus nisi tempus
            tortor, non mollis tortor ex id metus. Integer dictum tellus vel
            volutpat aliquet.
          </p>
          <p>
            Fusce tempus ac sem vitae gravida. Morbi vitae lacinia arcu.
            Vestibulum pretium pulvinar elit, quis ultricies tellus rutrum et.
            Fusce rhoncus, mi non rutrum dignissim, ante risus lobortis urna,
            nec aliquam nisl urna semper mi. Maecenas mattis consectetur nisi,
            elementum elementum libero viverra et.
          </p>
          <h2>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</h2>
          <p>
            Nunc tristique a leo eget fringilla. Morbi eget tempor velit, a
            varius augue. Integer id elit libero. Duis non justo placerat,
            pharetra metus ac, lobortis nisi. Maecenas non enim sed turpis
            ornare fringilla. Nullam sit amet venenatis est, vitae luctus
            mauris. Sed a dignissim lacus. Donec maximus justo lorem, quis
            finibus leo tempus iaculis. Suspendisse potenti. Aenean condimentum
            justo cursus lacus rutrum fringilla. Sed euismod sapien leo, in
            molestie sem gravida tincidunt. Phasellus sed nulla tempus, ornare
            nibh eu, porta velit. Praesent sit amet felis pellentesque nunc
            convallis molestie. Integer ut nulla viverra, congue nisi vel,
            aliquam arcu.
          </p>
          <motion.ul
            animate={isOpen == 3 ? "open" : "closed"}
            variants={fabVariants}
            style={{
              position: "fixed",
              bottom: 125,
              right: 25
            }}
          >
            {itemIds.map(i => (
              <motion.li variants={liVariants} i={i} key={i}>
                <Button circular icon="car" />
              </motion.li>
            ))}
          </motion.ul>{" "}
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
