/** Trims and normalises text input. */
export const cleanString = (value: unknown): string =>
  typeof value === 'string' ? value.trim() : '';