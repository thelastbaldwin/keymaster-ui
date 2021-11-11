const normalizeNotes = rootNote => {
  let notes = rootNote;

  notes = notes.charAt(0).toUpperCase() + notes.slice(1).toLowerCase();

  return notes;
}

const normalizeScale = scale => {
  return scale.replace(/[_-]/gim, ' ').toLowerCase();
}

const normalizeUse7thChords = use7thChords => {
  return !!(use7thChords === 'true' || use7thChords === '');
}


module.exports = {
  normalizeNotes,
  normalizeScale,
  normalizeUse7thChords
}
