import React from "react";
import { Button } from "semantic-ui-react";
import { PropTypes } from "prop-types";
import styled from "styled-components";

const ScalerDiv = styled.div`
  position: fixed;
  bottom: 0px;
  right: 0px;
  padding: 5px;
`;

export const Scaler = React.memo(({ scale, setScale }) => {
  return (
    <ScalerDiv>
      <Button icon="minus" onClick={() => setScale(scale * 0.9)} />
      <span style={{ padding: "3px" }}>
        {parseFloat(scale * 100).toFixed(0) + "%"}
      </span>
      <Button icon="plus" onClick={() => setScale(scale * 1.1)} />
    </ScalerDiv>
  );
});

Scaler.propTypes = { scale: PropTypes.number, setScale: PropTypes.func };
Scaler.displayName = "Scaler";
