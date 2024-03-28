export const regexpMatches = (str: string, reg: RegExp) => {
  const matches = str.matchAll(reg);
  return Array.from(matches).map((v) => v[1]);
};
