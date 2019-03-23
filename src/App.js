import React, { useState } from "react";
import "./App.css";

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
            fill: "rgb(100,100,100)",
            strokeWidth: 2,
            stroke: "rgb(0,0,0)"
          }}
        />
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
