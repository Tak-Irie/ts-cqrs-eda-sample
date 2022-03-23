const serializeJSON = (input: any) =>
  JSON.stringify(input, (key, value) =>
    typeof value === "bigint" ? `${value}n` : value
  );

const deserializeJSON = (input: string) =>
  JSON.parse(input, (key, value) =>
    /^\d+n$/.test(`${value}`) ? BigInt(value.slice(0, -1)) : value
  );

export { serializeJSON, deserializeJSON };
