export const checkEnv = () => {
  if (
    (typeof process.env !== "undefined" &&
      process.env.NODE_ENV === "development") ||
    (typeof process.env !== "undefined" && process.env.NODE_ENV === "test")
  ) {
    return true;
  }

  return null;
};
