export interface Factory<Args extends Array<unknown>, R> {
  create(...args: Args): R
}
