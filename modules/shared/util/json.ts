const serializeJSON = (input: unknown): string => {
  const json = JSON.stringify(input, (key, value) =>
    typeof value === "bigint" ? `${value}n` : value
  );
  return json;
};

const deserializeJSON = (input: string | Buffer): BigInt | string => {
  let _input: string;
  if (input instanceof Buffer) {
    _input = input.toString();
  } else {
    _input = input;
  }
  return JSON.parse(_input, (key, value: string) =>
    /^\d+n$/.test(`${value}`) ? BigInt(value.slice(0, -1)) : value
  );
};
export { serializeJSON, deserializeJSON };
