import React, { useState } from "react";
import "./App.css";
import _ from "lodash";

const components = [
  {
    uuid: Math.random(),
    type: "Dial",
    cx: 25,
    cy: 25,
    r: 10
  },
  {
    uuid: Math.random(),
    type: "Dial",
    cx: 50,
    cy: 25,
    r: 10
  }
];

function Dials() {
  return (
    <>
      {components.map(component => {
        return (
          <circle
            key={component.uuid}
            cx={component.cx}
            cy={component.cy}
            r={component.r}
            stroke="black"
            strokeWidth="1"
            fill="none"
          />
        );
      })}
    </>
  );
}

function App() {
  const [height, setHeight] = useState(200);
  const [width, setWidth] = useState(150);

  return (
    <>
      <svg width="300" height="300">
        <rect
          width={width}
          height={height}
          style={{
            fill: "none",
            strokeWidth: 2,
            stroke: "rgb(0,0,0)"
          }}
        />
        <Dials />
      </svg>
      <div className="dimensions">
        <input
          value={height}
          onChange={e => setHeight(e.target.value)}
          placeholder="Height"
          name="Height"
          type="text"
        />
        <input
          value={width}
          onChange={e => setWidth(e.target.value)}
          placeholder="Width"
          name="Width"
          type="text"
        />
      </div>
    </>
  );
}

export default App;
