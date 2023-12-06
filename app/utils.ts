// See: https://blog.otaviocapila.dev/nodejs-with-typescript-environment-variables-type-safe
const assertExists = (value: any, messageToThrow?: string) => {
  if (value !== undefined && value !== null) {
    return value;
  } else {
    throw new Error(
      messageToThrow || "assertExists: The passed value doesn’t exist"
    );
  }
};

export { assertExists };
