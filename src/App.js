import React, { useState } from "react";
import "./App.css";
import _ from "lodash";

const Dials = ({ dials }) => (
  <>
    {dials.map(dial => {
      return (
        <circle
          key={dial.uuid}
          cx={dial.cx}
          cy={dial.cy}
          r={dial.r}
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
        // console.log({
        //   width,
        //   height
        // });
        event.preventDefault();
        saveDimensions({
          width,
          height
        });
      }}
    >
      <p>
        <label htmlFor="width">Width </label>
        <input
          id="width"
          placeholder="Set Width"
          name="set-width"
          type="number"
          onChange={event => {
            setWidth(event.target.value);
          }}
          value={width}
        />
      </p>
      <p>
        <label htmlFor="height">Height </label>
        <input
          id="height"
          placeholder="Set Height"
          name="set-height"
          type="number"
          onChange={event => {
            setHeight(event.target.value);
          }}
          value={height}
        />
      </p>
      <p>
        <input type="submit" value="Submit" />
      </p>
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
        // console.log({
        //   uuid: Math.random(),
        //   type: "Dial",
        //   cx: cx,
        //   cy: cy,
        //   r: r
        // });
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
      <p>
        <label htmlFor="cx">CX </label>
        <input
          id="cx"
          placeholder="Set cx"
          name="set-cx"
          type="number"
          onChange={event => {
            setCx(event.target.value);
          }}
          value={cx}
        />
      </p>
      <p>
        <label htmlFor="cy">CY </label>
        <input
          id="cy"
          placeholder="Set cy"
          name="set-cy"
          type="number"
          onChange={event => {
            setCy(event.target.value);
          }}
          value={cy}
        />
      </p>
      <p>
        <label htmlFor="r">R </label>
        <input
          id="r"
          placeholder="Set r"
          name="set-r"
          type="number"
          onChange={event => {
            setR(event.target.value);
          }}
          value={r}
        />
      </p>
      <p>
        <input type="submit" value="Submit" />
      </p>
    </form>
  );
};

const ComponentInfo = ({ selectedComponent }) => {
  return <p>hello</p>;
};

const App = () => {
  const [dials, setDials] = useState([]);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [selectedComponent, setSelectedComponent] = useState({});

  console.log(dials);
  return (
    <>
      <div className="info">
        <div className="form-stuff">
          <PedalForm saveDimensions={setDimensions} />
          <DialForm
            saveDial={dial => {
              setDials([...dials, dial]);
            }}
          />
        </div>
        <div className="display-stuff">
          <ComponentInfo selectedComponent={selectedComponent} />
        </div>
      </div>
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
    </>
  );
};

export default App;
