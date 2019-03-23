import React, { useState } from "react";
import "./App.css";
import _ from "lodash";

const pedal = {
  name: "1981 Inventions",
  dimensions: { width: 300, height: 350 },
  components: {
    knobs: [
      { uuid: 0.2174300852631356, type: "Knob", cx: "50", cy: "100", r: "35" },
      { uuid: 0.2891690671731057, type: "Knob", cx: "150", cy: "100", r: "35" },
      { uuid: 0.5147078029919594, type: "Knob", cx: "250", cy: "100", r: "35" },
      { uuid: 0.2029468986169089, type: "Knob", cx: "50", cy: "275", r: "15" }
    ]
  }
};

const Knobs = ({ knobs, setSelectedComponent }) => (
  <>
    {knobs.map(knob => {
      return (
        <circle
          className="knob"
          key={knob.uuid}
          cx={knob.cx}
          cy={knob.cy}
          r={knob.r}
          stroke="black"
          strokeWidth="1"
          fill="darkgrey"
          onClick={() => setSelectedComponent(knob)}
        />
      );
    })}
  </>
);

const PedalForm = ({ dimensions, saveDimensions }) => {
  const [width, setWidth] = useState(dimensions.width);
  const [height, setHeight] = useState(dimensions.height);

  return (
    <form
      onSubmit={event => {
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
        <input type="submit" value="Submit Dimensions" />
      </p>
    </form>
  );
};

const KnobForm = ({ saveKnob }) => {
  const [cx, setCx] = useState(0);
  const [cy, setCy] = useState(0);
  const [r, setR] = useState(0);

  return (
    <form
      onSubmit={event => {
        event.preventDefault();
        saveKnob({
          uuid: Math.random(),
          type: "Knob",
          cx,
          cy,
          r
        });
        setCx(0);
        setCy(0);
        setR(0);
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
        <input type="submit" value="Add Knob" />
      </p>
    </form>
  );
};

const ComponentInfo = ({ selectedComponent }) => {
  const components = Object.entries(selectedComponent);
  console.log(components);
  return (
    <>
      {_.map(selectedComponent, (value, key) => {
        return (
          <p key={Math.random()}>
            <strong>{key}</strong>: {value}
          </p>
        );
      })}
    </>
  );
};

const App = () => {
  const [knobs, setKnobs] = useState(pedal.components.knobs);
  const [dimensions, setDimensions] = useState({
    width: pedal.dimensions.width,
    height: pedal.dimensions.height
  });
  const [selectedComponent, setSelectedComponent] = useState({});

  console.log(knobs);
  return (
    <>
      <div className="info">
        <div className="form-stuff">
          <PedalForm dimensions={dimensions} saveDimensions={setDimensions} />
          <KnobForm
            saveKnob={knob => {
              setKnobs([...knobs, knob]);
            }}
          />
        </div>
        <div className="display-stuff">
          <ComponentInfo selectedComponent={selectedComponent} />
        </div>
      </div>
      <h2>{pedal.name}</h2>
      <svg className="pedal" width="800" height="500">
        <rect
          width={dimensions.width}
          height={dimensions.height}
          style={{
            fill: "grey",
            strokeWidth: 2,
            stroke: "rgb(0,0,0)"
          }}
        />
        <Knobs knobs={knobs} setSelectedComponent={setSelectedComponent} />
      </svg>
    </>
  );
};

export default App;
