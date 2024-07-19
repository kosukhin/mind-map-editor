export interface Convertable<From, To> {
  convert(from: From): To;
}
