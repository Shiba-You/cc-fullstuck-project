const { expressServer } = require("./app");

const PORT = process.env.PORT || 3000;
const app = expressServer();
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});