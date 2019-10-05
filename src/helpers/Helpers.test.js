import {
  flattenKnobNotes,
  gridLock,
  knobsToUpdateModel,
  knobsToCreateModel,
  restructureDeletedKnobs,
  restructureUpdatedKnobs,
  restructureKnobsToCreate,
  flattenKnobObjects
} from "./Helpers";

it("rounds to the nearest 'step'", () => {
  expect(gridLock(3.5, 5)).toEqual(5);
  expect(gridLock(142, 5)).toEqual(140);
});

it("returns an array of objects with only ids", () => {
  const knobs = [
    {
      id: "ck19xy2ct00hu0789g21xtjj7",
      type: "Knob",
      description: "qwerqwer",
      color: "#A9A9A9",
      cx: 50,
      cy: 50,
      r: 25,
      position: 0,
      steps: 0,
      width: null,
      __typename: "Knob"
    },
    {
      id: "ck19xy2dl00i007896wfjtxyl",
      type: "Switch",
      description: "asdf",
      color: null,
      cx: 50,
      cy: 10,
      r: null,
      position: 0,
      steps: 2,
      width: 50,
      __typename: "Knob"
    }
  ];
  const deletedKnobs = [
    { id: "ck19xy2ct00hu0789g21xtjj7" },
    { id: "ck19xy2dl00i007896wfjtxyl" }
  ];
  expect(restructureDeletedKnobs(knobs)).toEqual(deletedKnobs);
});

it("restructures an array of knobs to update according to the defined model", () => {
  const knobs = [
    {
      id: "ck19xy2da00hw0789si763lh7",
      type: "Knob",
      description: "Knob",
      color: "#A9A9A9",
      cx: 19.41796875,
      cy: 76.80078125,
      r: 20,
      position: 0,
      steps: 0,
      width: null,
      __typename: "Knob"
    },
    {
      id: "ck19xy2dd00hy0789zvkbi5zz",
      type: "Knob",
      description: "Knob",
      color: "#A9A9A9",
      cx: 77.34375,
      cy: 81.18359375,
      r: 20,
      position: 0,
      steps: 0,
      width: null,
      __typename: "Knob"
    },
    {
      id: "ck19xz04h00ih0789ne6u3gtz",
      type: "Switch",
      description: "asdfas",
      color: null,
      cx: 50,
      cy: 100,
      r: null,
      position: 0,
      steps: 3,
      width: 60,
      __typename: "Knob"
    }
  ];
  const updatedKnobs = [
    {
      id: "ck19xy2da00hw0789si763lh7",
      details: {
        description: "Knob",
        color: "#A9A9A9",
        cx: 19.41796875,
        cy: 76.80078125,
        r: 20,
        position: 0,
        steps: 0,
        width: null
      }
    },
    {
      id: "ck19xy2dd00hy0789zvkbi5zz",
      details: {
        description: "Knob",
        color: "#A9A9A9",
        cx: 77.34375,
        cy: 81.18359375,
        r: 20,
        position: 0,
        steps: 0,
        width: null
      }
    },
    {
      id: "ck19xz04h00ih0789ne6u3gtz",
      details: {
        description: "asdfas",
        color: null,
        cx: 50,
        cy: 100,
        r: null,
        position: 0,
        steps: 3,
        width: 60
      }
    }
  ];
  expect(restructureUpdatedKnobs(knobs, knobsToUpdateModel)).toEqual(
    updatedKnobs
  );
});

it("restructures an array of knobs to create according to the defined model", () => {
  const knobs = [
    {
      id: "ck19xy2ct00hu0789g21xtjj7",
      type: "Knob",
      description: "qwerqwer",
      color: "#A9A9A9",
      cx: 50,
      cy: 50,
      r: 25,
      position: 0,
      steps: 0,
      width: null,
      __typename: "Knob"
    },
    {
      id: "ck19xy2dd00hy0789zvkbi5zz",
      type: "Knob",
      description: "Knob",
      color: "#A9A9A9",
      cx: 77.34375,
      cy: 81.18359375,
      r: 20,
      position: 0,
      steps: 0,
      width: null,
      __typename: "Knob"
    },
    {
      id: "ck19xy2dl00i007896wfjtxyl",
      type: "Switch",
      description: "asdf",
      color: null,
      cx: 50,
      cy: 10,
      r: null,
      position: 0,
      steps: 2,
      width: 50,
      __typename: "Knob"
    }
  ];

  const updatedKnobs = [
    {
      type: "Knob",
      description: "qwerqwer",
      color: "#A9A9A9",
      cx: 50,
      cy: 50,
      r: 25,
      position: 0,
      steps: 0,
      width: null
    },
    {
      type: "Knob",
      description: "Knob",
      color: "#A9A9A9",
      cx: 77.34375,
      cy: 81.18359375,
      r: 20,
      position: 0,
      steps: 0,
      width: null
    },
    {
      type: "Switch",
      description: "asdf",
      color: null,
      cx: 50,
      cy: 10,
      r: null,
      position: 0,
      steps: 2,
      width: 50
    }
  ];
  expect(restructureKnobsToCreate(knobs, knobsToCreateModel)).toEqual(
    updatedKnobs
  );
});

it("creates an object from array of knobs whos keys are the knobs ids", () => {
  const knobs = [
    {
      id: "ck1anr6t800ko0789znmbulmx",
      type: "Indicator",
      description: "fff",
      color: "#0AAA00",
      cx: 150,
      cy: 285,
      r: 10,
      position: 0,
      steps: 0,
      width: null,
      __typename: "Knob"
    },
    {
      id: "ck1anr6tl00kq0789rr45nrur",
      type: "Knob",
      description: "Knob",
      color: "#A9A9A9",
      cx: 40,
      cy: 35,
      r: 20,
      position: 0,
      steps: 0,
      width: null,
      __typename: "Knob"
    },
    {
      id: "ck1anr6tp00ks0789iiq14hxe",
      type: "Knob",
      description: "Knob",
      color: "#A9A9A9",
      cx: 150,
      cy: 35,
      r: 20,
      position: 0,
      steps: 0,
      width: null,
      __typename: "Knob"
    },
    {
      id: "ck1anr6u900ku0789yri69eve",
      type: "Knob",
      description: "Knob",
      color: "#A9A9A9",
      cx: 260,
      cy: 35,
      r: 20,
      position: 0,
      steps: 0,
      width: null,
      __typename: "Knob"
    },
    {
      id: "ck1anrzib00lb0789x46w57km",
      type: "Indicator",
      description: "red",
      color: "#c23639",
      cx: 150,
      cy: 200,
      r: 8,
      position: 0,
      steps: 0,
      width: null,
      __typename: "Knob"
    }
  ];
  const flattenedKnobObject = {
    ck1anr6t800ko0789znmbulmx: "",
    ck1anr6tl00kq0789rr45nrur: "",
    ck1anr6tp00ks0789iiq14hxe: "",
    ck1anr6u900ku0789yri69eve: "",
    ck1anrzib00lb0789x46w57km: ""
  };

  expect(flattenKnobObjects(knobs)).toEqual(flattenedKnobObject);
});

it("creates an object from array of patches whos keys are the knobs ids, and notes are notes", () => {
  const patches = [
    {
      id: "ck1c3ipgv00ne07896eal7wjb",
      knob: {
        id: "ck19xy2ct00hu0789g21xtjj7",
        __typename: "Knob"
      },
      position: 182.8828125,
      notes: "yoyoyoyoyo",
      __typename: "Patch"
    },
    {
      id: "ck1c3iph200nh0789chxyylw4",
      knob: {
        id: "ck19xy2da00hw0789si763lh7",
        __typename: "Knob"
      },
      position: 188.2421875,
      notes: "",
      __typename: "Patch"
    },
    {
      id: "ck1c3iphb00nk07899gv5r8cx",
      knob: {
        id: "ck19xy2dd00hy0789zvkbi5zz",
        __typename: "Knob"
      },
      position: 156.26953125,
      notes: "",
      __typename: "Patch"
    },
    {
      id: "ck1c3iphi00nn0789cjyjiuy6",
      knob: {
        id: "ck19xy2dl00i007896wfjtxyl",
        __typename: "Knob"
      },
      position: 1,
      notes: "aaaaggggg",
      __typename: "Patch"
    },
    {
      id: "ck1c3ipht00nq07897dzbzzm5",
      knob: {
        id: "ck19xz04h00ih0789ne6u3gtz",
        __typename: "Knob"
      },
      position: 2,
      notes: "Hey I'm a new note",
      __typename: "Patch"
    }
  ];

  const flattenedNotes = {
    ck19xy2ct00hu0789g21xtjj7: "yoyoyoyoyo",
    ck19xy2da00hw0789si763lh7: "",
    ck19xy2dd00hy0789zvkbi5zz: "",
    ck19xy2dl00i007896wfjtxyl: "aaaaggggg",
    ck19xz04h00ih0789ne6u3gtz: "Hey I'm a new note"
  };

  expect(flattenKnobNotes(patches)).toEqual(flattenedNotes);
});
