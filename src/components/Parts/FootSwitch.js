import React from "react";

export const FootSwitch = React.memo(({ footSwitchDetails, dispatch }) => {
  const { cx, cy, r } = footSwitchDetails;

  return (
    <g transform={`rotate(${0} ${cx} ${cy})`}>
      <circle
        className="footSwitch component"
        cx={cx}
        cy={cy}
        r={r}
        stroke="black"
        strokeWidth="1"
        fill="darkgrey"
        onClick={() => console.log("Footswitch clicked.")}
      />
    </g>
  );
});
