import React, { Component } from "react";

const Knobql = ({ knob }) => {
  return (
    <div>
      <hr />
      {knob.id}
      <br />
      {knob.type}
      <br />
      {knob.description}
      <br />
      {knob.builder.id}
      <hr />
    </div>
  );
};

export default Knobql;
