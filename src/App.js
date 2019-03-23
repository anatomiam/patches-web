import React, { useState } from "react";
import "./App.css";
import _ from "lodash";

const pedal = {
  name: "1981 Inventions",
  dimensions: { width: 300, height: 350 },
  components: {
    dials: [
      { uuid: 0.2174300852631356, type: "Dial", cx: "50", cy: "100", r: "35" },
      { uuid: 0.2891690671731057, type: "Dial", cx: "150", cy: "100", r: "35" },
      { uuid: 0.5147078029919594, type: "Dial", cx: "250", cy: "100", r: "35" },
      { uuid: 0.2029468986169089, type: "Dial", cx: "50", cy: "275", r: "15" }
    ]
  }
};

const Dials = ({ dials, setSelectedComponent }) => (
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
          fill="darkgrey"
          onClick={() => setSelectedComponent(dial)}
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
  const components = Object.entries(selectedComponent);
  console.log(components);
  return (
    <>
      {_.map(selectedComponent, (value, key) => {
        return (
          <p>
            {key}: {value}
          </p>
        );
      })}
    </>
  );
};

const App = () => {
  const [dials, setDials] = useState(pedal.components.dials);
  const [dimensions, setDimensions] = useState({
    width: pedal.dimensions.width,
    height: pedal.dimensions.height
  });
  const [selectedComponent, setSelectedComponent] = useState({});

  console.log(dials);
  return (
    <>
      <div className="info">
        <div className="form-stuff">
          <PedalForm dimensions={dimensions} saveDimensions={setDimensions} />
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
        <Dials dials={dials} setSelectedComponent={setSelectedComponent} />
      </svg>
    </>
  );
};

export default App;
