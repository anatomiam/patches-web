import React, { useState } from "react";
import "./App.css";
import _ from "lodash";

const blankPedal = {
  name: "Blank Slate",
  dimensions: { width: 0, height: 0 },
  components: {
    knobs: [{ uuid: 0, type: "Empty", cx: 0, cy: 0, r: 0, angle: 0 }]
  }
};

const pedal = {
  name: "1981 Inventions",
  dimensions: { width: 300, height: 350 },
  components: {
    knobs: [
      {
        uuid: 0.2174300852631356,
        type: "Knob",
        cx: 50,
        cy: 80,
        r: 35,
        angle: 0
      },
      {
        uuid: 0.2891690671731057,
        type: "Knob",
        cx: 150,
        cy: 80,
        r: 35,
        angle: 0
      },
      {
        uuid: 0.5147078029919594,
        type: "Knob",
        cx: 250,
        cy: 80,
        r: 35,
        angle: 0
      },
      {
        uuid: 0.2029468986169089,
        type: "Knob",
        cx: 50,
        cy: 275,
        r: 15,
        angle: 0
      }
    ]
  }
};

const CBAPedal = {
  name: "Chase Bliss Audio",
  dimensions: { width: 200, height: 400 },
  components: {
    knobs: [
      {
        uuid: 0.5040629413572115,
        type: "Knob",
        cx: 33.3,
        cy: 33.3,
        r: 20,
        angle: 0
      },
      {
        uuid: 0.3653608914422355,
        type: "Knob",
        cx: 99.9,
        cy: 33.3,
        r: 20,
        angle: 0
      },
      {
        uuid: 0.8017249190010618,
        type: "Knob",
        cx: 166.5,
        cy: 33.3,
        r: 20,
        angle: 0
      },
      {
        uuid: 0.5040629413572315,
        type: "Knob",
        cx: 33.3,
        cy: 99.9,
        r: 20,
        angle: 0
      },
      {
        uuid: 0.3653603914422355,
        type: "Knob",
        cx: 99.9,
        cy: 99.9,
        r: 20,
        angle: 0
      },
      {
        uuid: 0.8017249190310618,
        type: "Knob",
        cx: 166.5,
        cy: 99.9,
        r: 20,
        angle: 0
      }
    ]
  }
};

const Knobs = ({ knobs, setSelectedComponent }) => (
  <>
    {knobs.map(knob => {
      return (
        <g
          key={knob.uuid}
          transform={`rotate(${knob.angle} ${knob.cx} ${knob.cy})`}
        >
          <circle
            className="knob component"
            cx={knob.cx}
            cy={knob.cy}
            r={knob.r}
            stroke="black"
            strokeWidth="1"
            fill="darkgrey"
            onClick={() => setSelectedComponent(knob)}
          />
          <line
            x1={knob.cx}
            y1={knob.cy + knob.r / 4}
            x2={knob.cx}
            y2={knob.cy + (3.25 * knob.r) / 4}
            stroke="black"
            strokeWidth="1"
            strokeLinecap="round"
          />
        </g>
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
  const [angle, setAngle] = useState(0);

  return (
    <form
      onSubmit={event => {
        event.preventDefault();
        saveKnob({
          uuid: Math.random(),
          type: "Knob",
          cx: parseFloat(cx),
          cy: parseFloat(cy),
          r: parseFloat(r),
          angle: parseFloat(angle)
        });
        setCx(0);
        setCy(0);
        setR(0);
        setAngle(0);
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
        <label htmlFor="angle">Angle </label>
        <input
          id="angle"
          placeholder="Set angle"
          name="set-angle"
          type="number"
          onChange={event => {
            setAngle(event.target.value);
          }}
          value={angle}
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

