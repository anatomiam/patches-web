import { filter, map, findIndex, isEqual, compact, pick, keys } from "lodash";

export const knobsToCreateModel = {
  type: null,
  description: null,
  color: null,
  cx: null,
  cy: null,
  r: null,
  angle: null,
  width: null
};

export const knobsToUpdateModel = {
  description: null,
  color: null,
  cx: null,
  cy: null,
  r: null,
  angle: null,
  width: null
};

export const getUpdatedKnobs = (oldKnobs, newKnobs) => {
  const knobsToUpdate = map(oldKnobs, oldKnob => {
    const index = findIndex(newKnobs, { id: oldKnob.id });
    if (index === -1) {
      return false;
    } else if (isEqual(oldKnob, newKnobs[index])) {
      return false;
    } else {
      return { ...oldKnob, ...newKnobs[index] };
    }
  });

  return compact(knobsToUpdate);
};

export const getDeletedKnobs = (oldKnobs, newKnobs) => {
  return filter(oldKnobs, oldKnob => {
    const index = findIndex(newKnobs, { id: oldKnob.id });
    if (index === -1) {
      return oldKnob;
    }
  });
};

export const getNewKnobs = (oldKnobs, newKnobs) => {
  return filter(newKnobs, newKnob => {
    const index = findIndex(oldKnobs, { id: newKnob.id });
    if (index === -1) {
      return newKnob;
    }
  });
};

export const restructureDeletedKnobs = knobs => {
  return map(knobs, knob => {
    return { id: knob.id };
  });
};

export const restructureUpdatedKnobs = (knobs, model) => {
  return map(knobs, knob => {
    return { id: knob.id, details: pick(knob, keys(model)) };
  });
};

export const restructureKnobsToCreate = (knobs, model) => {
  return map(knobs, knob => {
    return pick(knob, keys(model));
  });
};

export const flattenKnobObjects = knobs => {
  return knobs
    .map(knob => {
      return { [knob.id]: knob.description };
    })
    .reduce((obj, knob) => ({ ...obj, ...knob }), {});
};
