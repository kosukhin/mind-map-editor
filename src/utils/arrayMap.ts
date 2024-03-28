export const arrayMap = <P extends (ReadonlyArray<any> | readonly [any])>(
  fn: (...params: P) => any,
  options: P,
) => fn(...options);
