const normilizeNotes = rootNote => {
  let notes = rootNote;

  notes = notes.charAt(0).toUpperCase() + notes.slice(1).toLowerCase();

  return notes;
}

const nomilizeScale = scale => {
  return scale.replace(/[_-]/gim, ' ').toLowerCase();
}

const nomilazeUse7thChords = use7thChords => {
  return !!(use7thChords === 'true' || use7thChords === '');
}


module.exports = {
  normilizeNotes,
  nomilizeScale,
  nomilazeUse7thChords
}
