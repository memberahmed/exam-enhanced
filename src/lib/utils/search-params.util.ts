export function buildSearchParams(params: SearchParams): string {
  const sp = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (typeof value === "string") {
      sp.append(key, value);
    } else if (Array.isArray(value)) {
      value.forEach((v) => sp.append(key, v));
    }
    // undefined مش بيتضاف
  });

  return sp.toString();
}
