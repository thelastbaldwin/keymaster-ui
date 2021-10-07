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

export {
  chords, 
  notes, 
  scales,
};