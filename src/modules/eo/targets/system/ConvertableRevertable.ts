export interface ConvertableRevertable<From, To> {
  convert(from: From): To;
  revert(from: To): From;
}
