const choice = (ary, seed) => {
  return ary[parseInt(seed) % ary.length];
};
