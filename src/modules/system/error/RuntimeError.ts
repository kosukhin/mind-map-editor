export class RuntimeError extends Error {
  constructor(message: string, options?: {cause: unknown}) {
    super(message, options as any);
  }
}
