export function ifElse<T>(
  comparator: (T) => boolean,
  thenBranch: Function,
  elseBranch?: Function
) {
  return (v: T) => {
    if (comparator(v)) {
      thenBranch(v)
    } else if (elseBranch) {
      elseBranch(v)
    }

    return v
  }
}
