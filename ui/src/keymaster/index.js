// TODO: revise symbols
const chords = {
  major: "Major",
  major7: "Major7",
  minor: "minor",
  minor7: "minor7",
  minorMajor7: "minor-major7",
  diminished: "diminished",
  diminished7: "diminished7",
  halfDiminished: "half-diminished",
  halfDiminished7: "half-diminished7",
  augmented: "augmented",
  augmented7: "augmented7", // this should be major7#5
  augmentedMajor7: "augmented Major7",
  dominant: "dominant",
  dominant7: "dominant7",
};

const notes = [
  "C",
  ["C#", "Db"],
  "D",
  ["D#", "Eb"],
  "E",
  "F",
  ["F#", "Gb"],
  "G",
  ["G#", "Ab"],
  "A",
  ["A#", "Bb"],
  "B",
];

const scales = {
  MAJOR: "major",
  MINOR: "minor",
  MELODIC_MINOR: "melodic minor",
  HARMONIC_MINOR: "harmonic minor",
};

const noteMap = new Map();
notes.forEach((note, i) => {
  noteMap.set(note, i);
  if (Array.isArray(note)) {
    note.forEach((n) => {
      noteMap.set(n, i);
    });
  }
});

const findNoteIndex = (note) => noteMap.get(note);

const isMajor = (scaleName) => /major/i.test(scaleName);
const isMinor = (scaleName) => /minor/i.test(scaleName);

const sharpMajorKeysList = "C G D A E B F#".split(" ");
const flatMajorKeysList = "F Bb Eb Ab Db Gb".split(" ");

const sharpMinorKeysList = "A E B F# C# G# D#".split(" ");
const flatMinorKeysList = "D G C F Bb Eb".split(" ");

const useSharps = (notes) => notes.map((n) => (Array.isArray(n) ? n[0] : n));
const useFlats = (notes) => notes.map((n) => (Array.isArray(n) ? n[1] : n));

// This will result in some irregularities with formatting certain notes.
// It may be  best to use these tools to generate a large static dataset and
// apply more correct formatting.
const formatScale = ({ rootNote, notes, scale }) => {
  if (isMinor(scale)) {
    if (sharpMinorKeysList.indexOf(rootNote) !== -1) {
      return useSharps(notes);
    } else if (flatMinorKeysList.indexOf(rootNote) !== -1) {
      return useFlats(notes);
    }
  } else if (isMajor(scale)) {
    if (sharpMajorKeysList.indexOf(rootNote) !== -1) {
      return useSharps(notes);
    } else if (flatMajorKeysList.indexOf(rootNote) !== -1) {
      return useFlats(notes);
    }
  }
  return notes;
};

const flatten = (i, amt) => {
  let newIndex = i - amt;
  if (newIndex >= 0) {
    return newIndex;
  } else {
    while (newIndex < 0) {
      newIndex = notes.length + newIndex;
    }
    return newIndex;
  }
};

const raise = (i, amt) => (i + amt) % notes.length;

const wholeStep = (i) => raise(i, 2);

const halfStep = (i) => raise(i, 1);

const deriveMajor = (root) => {
  const key = [];
  let i = findNoteIndex(root);

  key.push(notes[i]);

  i = wholeStep(i);
  key.push(notes[i]);
  i = wholeStep(i);
  key.push(notes[i]);
  i = halfStep(i);
  key.push(notes[i]);
  i = wholeStep(i);
  key.push(notes[i]);
  i = wholeStep(i);
  key.push(notes[i]);
  i = wholeStep(i);
  key.push(notes[i]);

  return key;
};

const deriveNaturalMinor = (root) => {
  const scale = deriveMajor(root);

  const flatThree = flatten(findNoteIndex(scale[2]), 1);
  scale[2] = notes[flatThree];

  const flatSix = flatten(findNoteIndex(scale[5]), 1);
  scale[5] = notes[flatSix];

  const flatSeven = flatten(findNoteIndex(scale[6]), 1);
  scale[6] = notes[flatSeven];

  return scale;
};

const deriveMelodicMinor = (root) => {
  const scale = deriveNaturalMinor(root);

  const raisedSix = halfStep(findNoteIndex(scale[5]));
  scale[5] = notes[raisedSix];

  const raisedSeven = halfStep(findNoteIndex(scale[6]));
  scale[6] = notes[raisedSeven];

  return scale;
};

const deriveHarmonicMinor = (root) => {
  const scale = deriveNaturalMinor(root);
  const flatSeven = halfStep(findNoteIndex(scale[6]), 1);

  scale[6] = notes[flatSeven];

  return scale;
};

const diatonicMajorChords = [
  chords.major,
  chords.minor,
  chords.minor,
  chords.major,
  chords.major,
  chords.minor,
  chords.diminished,
];
const diatonicMajor7Chords = [
  chords.major7,
  chords.minor7,
  chords.minor7,
  chords.major7,
  chords.dominant7,
  chords.minor7,
  chords.halfDiminished7,
];
const diatonicMinorChords = [
  chords.minor,
  chords.diminished,
  chords.major,
  chords.minor,
  chords.minor,
  chords.major,
  chords.major,
];
const diatonicMinor7Chords = [
  chords.minor7,
  chords.halfDiminished7,
  chords.major7,
  chords.minor7,
  chords.minor7,
  chords.minor7,
  chords.dominant7,
];
const diatonicHarmonicMinorChords = [
  chords.minor,
  chords.diminished,
  chords.augmented,
  chords.minor,
  chords.major,
  chords.major,
  chords.diminished,
];
const diatonicHarmonicMinor7Chords = [
  chords.minorMajor7,
  chords.halfDiminished7,
  chords.augmentedMajor7,
  chords.minor7,
  chords.dominant7,
  chords.major7,
  chords.diminished7,
];
const diatonicMelodicMinorChords = [
  chords.minor,
  chords.minor,
  chords.augmented,
  chords.major,
  chords.major,
  chords.diminished,
  chords.diminished,
];

const diatonicMelodicMinor7Chords = [
  chords.minorMajor7,
  chords.minor7,
  chords.augmented7,
  chords.dominant7,
  chords.dominant7,
  chords.halfDiminished7,
  chords.halfDiminished7,
];

const getChords = ({ rootNote, scale, use7thChords }) => {
  const minorMap = {
    triads: diatonicMinorChords,
    seventhChords: diatonicMinor7Chords,
    generator: deriveNaturalMinor,
  };
  const chordMap = {
    [scales.MAJOR]: {
      triads: diatonicMajorChords,
      seventhChords: diatonicMajor7Chords,
      generator: deriveMajor,
    },
    [scales.MINOR]: minorMap,
    [scales.HARMONIC_MINOR]: {
      triads: diatonicHarmonicMinorChords,
      seventhChords: diatonicHarmonicMinor7Chords,
      generator: deriveHarmonicMinor,
    },
    [scales.MELODIC_MINOR]: {
      triads: diatonicMelodicMinorChords,
      seventhChords: diatonicMelodicMinor7Chords,
      generator: deriveMelodicMinor,
    },
  };

  const key = chordMap[scale.toLowerCase()];
  const chordQualites = key[use7thChords ? "seventhChords" : "triads"]; //TODO: add numeric annotations to these chords

  return {
    rootNote,
    scale,
    chordQualites,
    notes: formatScale({ rootNote, notes: key.generator(rootNote), scale }),
  };
};

export { notes, scales, getChords };
