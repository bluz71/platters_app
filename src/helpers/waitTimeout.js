export const waitTimeout = milliseconds =>
  new Promise(resolve => setTimeout(resolve, milliseconds))
