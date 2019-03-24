export const pedalss = {
  name: "1981 Inventions",
  dimensions: { width: 300, height: 350 },
  selectedComponent: {},
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

const blankPedal = {
  name: "Blank Slate",
  dimensions: { width: 0, height: 0 },
  components: {
    knobs: [{ uuid: 0, type: "Empty", cx: 0, cy: 0, r: 0, angle: 0 }]
  }
};

export const pedal = {
  name: "Chase Bliss Audio",
  dimensions: { width: 200, height: 400 },
  selectedComponent: {},
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
