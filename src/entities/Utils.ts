export type FType<Ret extends any, Params extends Array<any> = []> = (
  ...args: Params
) => Ret
