const express = require("express");
const router = express.Router();
const pagesController = require("../controllers/pagesController");

router.get("/", pagesController.findPagesByBatch);
router.post("/", pagesController.addPage);
router.get("/:id", pagesController.findPageById);

module.exports = router;
