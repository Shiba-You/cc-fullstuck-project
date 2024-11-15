const express = require("express");
const router = express.Router();
const gptController = require("../controllers/gptController");

router.post("/", gptController.generateImage);

module.exports = router;
