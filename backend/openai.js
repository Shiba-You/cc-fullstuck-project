const { OpenAI } = require("openai");
require("dotenv").config({ path: ".env.local" });

const openai = new OpenAI({
  apiKey: process.env.GPT_API_KEY,
});

module.exports = openai;
