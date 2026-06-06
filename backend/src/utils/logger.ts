export const logger = {
  info: (...args: unknown[]) => console.info('[PrepZen]', ...args),
  warn: (...args: unknown[]) => console.warn('[PrepZen]', ...args),
  error: (...args: unknown[]) => console.error('[PrepZen]', ...args)
};
