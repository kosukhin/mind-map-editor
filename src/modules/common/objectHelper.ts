export const objectHelper = {
  setValues(object: any, values: Record<string, any>) {
    const defaultValue = values['*'] ?? null;
    Object.keys(object).forEach((key) => {
      object[key] = values[key] ?? defaultValue;
    });
  },
};
