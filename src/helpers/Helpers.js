import { filter, findIndex, isEqual, compact, pick, keys } from "lodash";

export const knobsToDeleteModel = {
  id: null
};
export const knobsToCreateModel = {
  type: null,
  description: null,
  color: null,
  cx: null,
  cy: null,
  r: null,
  position: null,
  steps: null,
  width: null
};

export const knobsToUpdateModel = {
  description: null,
  color: null,
  cx: null,
  cy: null,
  r: null,
  position: null,
  steps: null,
  width: null
};

const patchesModel = {
  id: null,
  position: null,
  notes: null
};

export const gridLock = (target, step) => {
  return Math.round(target / step) * step;
};

export const getUpdatedKnobs = (oldKnobs, newKnobs) => {
  const knobsToUpdate = oldKnobs.map(oldKnob => {
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

export const restructureUpdatedKnobs = (knobs, model) => {
  return knobs.map(knob => {
    return { id: knob.id, details: pick(knob, keys(model)) };
  });
};

export const pickKeysFromArray = (items, model) => {
  return items.map(item => {
    return pick(item, keys(model));
  });
};

export const flattenKnobObjects = knobs => {
  return knobs
    .map(knob => {
      return { [knob.id]: "" };
    })
    .reduce((obj, knob) => ({ ...obj, ...knob }), {});
};

export const flattenKnobNotes = patches => {
  return patches
    .map(patch => {
      return { [patch.knob.id]: patch.notes };
    })
    .reduce((obj, knob) => ({ ...obj, ...knob }), {});
};

// TODO clean this up
// grab only id, position, and notes from knobs,
// change 'id' key to 'knob' to fit patch model
export const getPatchesToCreate = (knobs, knobNotes) => {
  return knobs
    .map(knob => {
      return pick(knob, keys(patchesModel));
    })
    .map(knob => {
      return {
        // square brackets are around knob.id because pick takes an array as the second parameter
        notes: pick(knobNotes, [knob.id])[knob.id],
        ...knob
      };
    })
    .map(patch => {
      return {
        knob: patch.id,
        position: patch.position,
        notes: patch.notes
      };
    });
};

export const restructureUpdatedPatches = (knobs, knobNotes) => {
  return knobs.map(knob => {
    return {
      id: knob.patchId,
      details: {
        position: knob.position,
        notes: knobNotes[knob.id]
      }
    };
  });
};
