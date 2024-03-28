export const buildMapFromArray = (arr: any[]) => arr.reduce((acc, item) => {
  acc[item] = item;
  return acc;
}, {} as any);
