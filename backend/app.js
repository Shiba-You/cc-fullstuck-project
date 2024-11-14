const express = require("express");
const pagesRoutes = require("./routes/pagesRoutes");
const customLogger = require("./middleware/logger");
const cors = require("cors");

const expressServer = () => {
  const app = express();
  app.use(express.json());

  app.use(customLogger);
  app.use(
    cors({
      origin: "http://localhost:5173", //アクセス許可するオリジン
      credentials: true, //レスポンスヘッダーにAccess-Control-Allow-Credentials追加
    })
  );

  app.use("/api/pages", pagesRoutes);

  return app;
};

module.exports = { expressServer };
