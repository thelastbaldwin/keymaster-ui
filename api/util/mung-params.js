const normilizeNotes = rootNote => {
  let notes = rootNote;

  if (notes.indexOf(',') >= 0) {
    notes = notes.split(',');

    notes = notes[1].charAt(0).toUpperCase() + notes[1].slice(1).toLowerCase();
  } else {
    notes = notes.toUpperCase();
  }

  return notes;
}

const nomilizeScale = scale => {
  return scale.replace(/[-_]/gim, ' ').toLowerCase();
}

const nomilazeUse7thChords = use7thChords => {
  return !!(use7thChords === 'true' || use7thChords === '');
}


module.exports = {
  normilizeNotes,
  nomilizeScale,
  nomilazeUse7thChords
}
