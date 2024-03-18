export type FType<Ret, Params extends Array<any> = []> = (
  ...args: Params
) => Ret

export type AnyFn = (...args: any[]) => any
