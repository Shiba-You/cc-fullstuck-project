const express = require("express");
const router = express.Router();
const pagesController = require("../controllers/pagesController");

router.get("/", pagesController.findPagesByBatch);
router.post("/", pagesController.createPage);
router.get("/:id", pagesController.findPageById);
router.put("/:id", pagesController.updatePage);

module.exports = router;
