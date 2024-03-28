export const isNotNullish = <T>(
  v: T | undefined,
): v is T => v !== null && v !== undefined;
