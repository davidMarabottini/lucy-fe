export const rewriteRoute = (route: string, values: {[name: string]: string}): string =>
  Object.keys(values).reduce((acc, x) => acc.replace(x, values[x]), route)