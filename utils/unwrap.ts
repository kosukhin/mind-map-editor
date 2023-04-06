export const unwrap =
  <U extends (...args: any) => any>(fn: U) =>
  (params: Parameters<U>): ReturnType<U> => {
    return fn(params[0], params[1], params[2], params[3], params[4])
  }

// export const unwrap = curry(
//   <U extends (...args: any) => any>(
//     fn: U,
//     params: Parameters<U>
//   ): ReturnType<U> => {
//     return fn(params[0], params[1], params[2], params[3], params[4])
//   }
// )
