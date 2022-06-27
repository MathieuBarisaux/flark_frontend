const upperCaseFirst = (string) => {
  const newString = string.charAt(0).toUpperCase() + string.substring(1);

  return newString;
};

export default upperCaseFirst;
