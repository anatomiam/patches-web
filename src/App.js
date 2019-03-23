import React, { useState } from "react";
import "./App.css";
import _ from "lodash";

const Dials = ({ dials }) => (
  <>
    {dials.map(component => {
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

const PedalForm = ({ saveDimensions }) => {
  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);

  return (
    <form
      onSubmit={event => {
        console.log({
          width,
          height
        });
        event.preventDefault();
        saveDimensions({
          width,
          height
        });
      }}
    >
      <input
        placeholder="Set Width"
        name="set-width"
        type="text"
        onChange={event => {
          setWidth(event.target.value);
        }}
        value={width}
      />
      <input
        placeholder="Set Height"
        name="set-height"
        type="text"
        onChange={event => {
          setHeight(event.target.value);
        }}
        value={height}
      />
      <input type="submit" value="Submit" />
    </form>
  );
};

const DialForm = ({ saveDial }) => {
  const [cx, setCx] = useState(0);
  const [cy, setCy] = useState(0);
  const [r, setR] = useState(0);

  return (
    <form
      onSubmit={event => {
        console.log({
          uuid: Math.random(),
          type: "Dial",
          cx: cx,
          cy: cy,
          r: r
        });
        event.preventDefault();
        saveDial({
          uuid: Math.random(),
          type: "Dial",
          cx: cx,
          cy: cy,
          r: r
        });
      }}
    >
      <input
        placeholder="Set cx"
        name="set-cx"
        type="text"
        onChange={event => {
          setCx(event.target.value);
        }}
        value={cx}
      />
      <input
        placeholder="Set cy"
        name="set-cy"
        type="text"
        onChange={event => {
          setCy(event.target.value);
        }}
        value={cy}
      />
      <input
        placeholder="Set r"
        name="set-r"
        type="text"
        onChange={event => {
          setR(event.target.value);
        }}
        value={r}
      />
      <input type="submit" value="Submit" />
    </form>
  );
};

function App() {
  const [dials, setDials] = useState([]);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  return (
    <>
      <svg width="800" height="500">
        <rect
          width={dimensions.width}
          height={dimensions.height}
          style={{
            fill: "none",
            strokeWidth: 2,
            stroke: "rgb(0,0,0)"
          }}
        />
        <Dials dials={dials} />
      </svg>
      <div className="form-stuff">
        <PedalForm saveDimensions={setDimensions} />
        <DialForm
          saveDial={dial => {
            setDials([...dials, dial]);
          }}
        />
      </div>
    </>
  );
}

export default App;
