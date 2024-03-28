export const arrayFilter = <P extends (ReadonlyArray<any> | readonly [any])>(
  fn: (...params: P) => boolean,
  options: P,
) => fn(...options);
