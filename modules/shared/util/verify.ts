const verify = (constraintName: string, condition: boolean) => {
  if (!condition) throw new Error(`constraint violated: ${constraintName}`);
};

export { verify };
