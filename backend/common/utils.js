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

  getRandomID(N) {
    const S = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const rand = Array.from(Array(N))
      .map(() => S[Math.floor(Math.random() * S.length)])
      .join("");
    return rand;
  },
};
