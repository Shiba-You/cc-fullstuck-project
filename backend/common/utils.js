const factroryError = (msg, status) => {
  const error = new Error(msg);
  error.code = status;
  return error;
};

module.exports = { factroryError };
