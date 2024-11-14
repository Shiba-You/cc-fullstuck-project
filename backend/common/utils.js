module.exports = {
  factroryError(msg, status, errorType = "Error") {
    let error;
    if (errorType == "Error") {
      error = new Error(msg);
    } else if (errorType == "Range") {
      error = new RangeError(msg);
    }
    error.code = status;
    return error;
  },

  validProps(valid) {
    return (propsToCheck) => {
      for (const p in propsToCheck) {
        if (!valid.includes(p)) {
          throw new Error();
        }
      }
      return propsToCheck;
    };
  },

  requiredProps(required) {
    return (propsToCheck) => {
      for (const p of required) {
        if (!propsToCheck[p]) {
          throw new Error();
        }
      }
      return propsToCheck;
    };
  },
};
