// ** Check if mail is ok **
const checkMail = (input) => {
  // We define the good mail format
  const mailFormatRegexp =
    /^[a-zA-Z0-9_.-]+@+[a-zA-Z0-9-]{2,}[.][a-zA-Z]{2,3}$/;

  // We test if input format is ok
  if (mailFormatRegexp.exec(input) == null) {
    return false;
  } else {
    return true;
  }
};

export default checkMail;
