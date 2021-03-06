import {
  BottomDrawerDiv,
  FooterDiv,
  NavItemDiv,
  bottomDrawerVariants
} from "../PageStyles";
import React, { useState } from "react";

import { Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { PropTypes } from "prop-types";

export const FooterMobile = ({ children }) => {
  const [isOpen, setIsOpen] = useState(0);
  return (
    <span className="mobile-only">
      <FooterDiv>
        <NavItemDiv>
          <Link to="/">
            <Button
              circular
              onClick={() => setIsOpen(isOpen === 1 ? 0 : 1)}
              icon="world"
            />
          </Link>
        </NavItemDiv>
        <NavItemDiv>
          <Link to="/builder">
            <Button
              circular
              onClick={() => setIsOpen(isOpen === 2 ? 0 : 2)}
              icon="world"
            />
          </Link>
        </NavItemDiv>
        <NavItemDiv>
          <Link to="/patcher">
            <Button
              circular
              onClick={() => setIsOpen(isOpen === 3 ? 0 : 3)}
              icon="world"
            />
          </Link>
        </NavItemDiv>
        <NavItemDiv>
          <Button
            circular
            onClick={() => setIsOpen(isOpen === 4 ? 0 : 4)}
            icon="world"
          />
        </NavItemDiv>
      </FooterDiv>
      <BottomDrawerDiv
        className="mobile-only"
        animate={isOpen === 4 ? "open" : "closed"}
        variants={bottomDrawerVariants}
      >
        {children}
      </BottomDrawerDiv>
    </span>
  );
};

FooterMobile.propTypes = {
  children: PropTypes.object
};
