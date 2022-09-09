export const checkEnv = () => {
  if (typeof process !== "undefined" && process.env.NODE_ENV === "prod") {
    return true;
  }

  return null;
};
