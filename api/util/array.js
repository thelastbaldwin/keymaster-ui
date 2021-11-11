const shiftArrayStart = (arr, start) => {
  const copy = [...arr];
  const cut = copy.splice(0, start);
  return copy.concat(cut);
}

module.exports = {
  shiftArrayStart,
};