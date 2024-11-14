const customLogger = (req, res, next) => {
  console.log(`midlware: ${req.method} ${req.path}`);
  next();
};

module.exports = customLogger;
