export interface ActionType<P = any> {
  do(config: P): this;
}
