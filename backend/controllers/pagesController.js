const pageModel = require("../models/pageModel");

const findPagesByBatch = async (req, res) => {
  try {
    const pages = await pageModel.findByBatch();
    res.status(200).send(pages);
  } catch (e) {
    res.status(500).json({ error: "Failed to get all pages" });
  }
};

const addPage = async (req, res) => {
  try {
    const page = await pageModel.add(req.body);
    res.status(201).json(page);
  } catch (e) {
    res.status(500).json({ error: "Failed to create page" });
  }
};

const findPageById = async (req, res) => {
  try {
    const page = await pageModel.findById();
    res.status(200).json(page);
  } catch (e) {
    res.status(500).json({ error: "Failed to get page" });
  }
};

module.exports = { findPagesByBatch, addPage, findPageById };
