const express = require("express");
const pagesRoutes = require("./routes/pagesRoutes");
const customLogger = require("./middleware/logger");

const expressServer = () => {
  const app = express();
  app.use(express.json());

  app.use(customLogger);

  app.use("/api/pages", pagesRoutes);

  return app;
};

module.exports = { expressServer };
