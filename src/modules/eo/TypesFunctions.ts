export type AnyFn = (...args: any[]) => any

export type Procedure = () => unknown

export type UnaryFn<T, R = any> = (value: T) => R
