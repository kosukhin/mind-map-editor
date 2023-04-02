import curry from 'lodash/fp/curry'

// TODO нужно доработать типизацию unwrapTuple чтобы сохранялись типы переменных
// Или проблема в типизации карирования в лодаше
export const unwrapTuple = curry(<T, U extends Function>(fn: U, tuple: T) => {
  return fn(...tuple) as ReturnType<U>
})
