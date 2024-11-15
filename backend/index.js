const { expressServer } = require("./app");
require("dotenv").config({ path: "./env.local" });

const PORT = process.env.DB_PORT || 3000;
const app = expressServer();
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
