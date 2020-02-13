import { uniqueId } from "lodash";

export const patcherData = {
  builder: "cju66ydwl000y0738rs8jz7yv",
  isNewPedal: true,
  isLoggedIn: false,
  selectedComponentId: null,
  selectedComponentPosition: 0,
  drag: false,
  scale: 1,
  knobs: [],
  originalKnobs: [],
  patchDetails: {
    patchNotes: {
      name: "",
      description: "",
      id: ""
    },
    knobNotes: {}
  },
  pedalDetails: {
    name: "",
    height: 0,
    width: 0,
    color: "#d4d7dd"
  }
};

export const builderData = {
  builder: "cju66ydwl000y0738rs8jz7yv",
  isNewPedal: true,
  isLoggedIn: false,
  selectedComponentId: null,
  selectedComponentPosition: 0,
  drag: false,
  tapKnobsIn: {
    isActive: false,
    knobType: ""
  },
  scale: 1,
  knobs: [],
  originalKnobs: [],
  patchDetails: {
    patchNotes: {
      name: "",
      description: "",
      id: ""
    },
    knobNotes: {}
  },
  pedalDetails: {
    name: "",
    height: 0,
    width: 0,
    color: "#d4d7dd"
  }
};

export const sharedData = {
  currentPage: "home",
  userId: "",
  isLoggedIn: false,
  scale: 1
};

export const defaultDeviceComponents = {
  knob: {
    type: "Knob",
    r: 20,
    position: 0,
    color: "#A9A9A9",
    description: "Knob",
    id: uniqueId("knob-")
  },
  footSwitch: {
    type: "FootSwitch",
    r: 15,
    color: "#A9A9A9",
    description: "Footswitch",
    id: uniqueId("footswitch-")
  },
  indicator: {
    type: "Indicator",
    r: 8,
    position: 0,
    color: "#a6aaa4",
    description: "Indicator",
    id: uniqueId("indicator-")
  },
  switch: {
    type: "Switch",
    color: "#A9A9A9",
    description: "Switch",
    steps: 3,
    width: 30,
    id: uniqueId("switch-")
  }
};
