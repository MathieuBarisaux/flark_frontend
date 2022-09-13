export const checkEnv = () => {
  if (typeof process !== "undefined" && process.env.NODE_ENV === "dev") {
    return true;
  }

  return null;
};
