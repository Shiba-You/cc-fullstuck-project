const pageModel = require("../models/pageModel");

const findPagesByBatch = async (req, res) => {
  try {
    const pages = await pageModel.findByBatch();
    res.status(200).send(pages);
  } catch (e) {
    res.status(500).json({ error: "Failed to get all pages" });
  }
};

const createPage = async (req, res) => {
  if (!req.body.title) {
    res.status(400).json({ error: "Title is required field" });
    return;
  }
  try {
    const page = await pageModel.create(req.body);
    res.status(201).json(page);
  } catch (e) {
    res.status(500).json({ error: "Failed to create page" });
  }
};

const findPageById = async (req, res) => {
  try {
    const page = await pageModel.findById(req.params.id);
    console.log(page);
    if (page) {
      res.status(200).json(page);
    } else {
      throw new Error();
    }
  } catch (e) {
    if (e) {
      res.status(500).json({ error: "Failed to get page" });
    }
  }
};

const updatePage = async (req, res) => {
  if (!req.body.title || !req.body.id || !req.body.createAt) {
    res.status(400).json({ error: "Id, Title, createAt is required field" });
    return;
  }
  if (req.body.id != req.params.id) {
    res.status(400).json({ error: "Failed to update page" });
    return;
  }
  try {
    const page = [await pageModel.update(req.body)];
    if (page) {
      res.status(200).json(page[0]);
    } else {
      throw new Error();
    }
  } catch (e) {
    res.status(500).json({ error: "Failed to update page" });
  }
};

module.exports = { findPagesByBatch, createPage, findPageById, updatePage };
