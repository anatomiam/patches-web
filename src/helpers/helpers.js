import { filter, findIndex, isEqual, compact, pick, keys } from "lodash";

export const knobsToCreateModel = {
  type: null,
  description: null,
  color: null,
  cx: null,
  cy: null,
  r: null,
  position: null,
  width: null
};

export const knobsToUpdateModel = {
  description: null,
  color: null,
  cx: null,
  cy: null,
  r: null,
  position: null,
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

export const restructureDeletedKnobs = knobs => {
  return knobs.map(knob => {
    return { id: knob.id };
  });
};

export const restructureUpdatedKnobs = (knobs, model) => {
  return knobs.map(knob => {
    return { id: knob.id, details: pick(knob, keys(model)) };
  });
};

export const restructureKnobsToCreate = (knobs, model) => {
  return knobs.map(knob => {
    return pick(knob, keys(model));
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

export const unflattenKnobNotes = patches => {
  return Object.entries(patches).map(patch => {
    return { knob: { id: patch[0] }, notes: patch[1] };
  });
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
