export const Group = <T>(value: T) => {
  return new GroupInst<T>(value)
}

export class GroupInst<T> {
  value: T

  constructor(value: T) {
    this.value = value
  }

  map(fn: (group: T) => unknown) {
    fn(this.value)
  }
}
