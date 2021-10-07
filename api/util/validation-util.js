const apiFile = require("../keymaster");

const use7thChordsValidMap = {
  true: true,
  false: true,
  undefined: true,
  '': true
}


const urlSlugValidation = ({ rootNote, scale, use7thChords}) => {
  const valids = [];

  if (rootNote && !apiFile.notes.find(n => {
    if (Array.isArray(n)) {
      return (n.join().toLowerCase() === rootNote.toLowerCase());
    }

    return n.toLowerCase() === rootNote.toLowerCase();
  })) {
    valids.push(`Invalid NOTE: "${rootNote}". Please use one of these: ${JSON.stringify(apiFile.notes, null, 2)}`);
  }

  if (scale && !apiFile.scales[scale.toUpperCase().replace('-', '_')]) {
    valids.push(`Invalid SCALE: "${scale}". Please use one of these: ${JSON.stringify(apiFile.scales, null, 2)}`);
  }

  if (!use7thChordsValidMap[use7thChords]) {
    valids.push(`Invalid 'use7thchords': "${use7thChords}". Please use a boolean: true/false`);
  }

  return valids.length === 0 ?  true : valids.join(' | ');
}

module.exports = {
  urlSlugValidation
}
