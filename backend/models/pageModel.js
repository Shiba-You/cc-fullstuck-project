const knex = require("../db/knex");
// TODO: バリデーションチェックの実装
// const { validProps, requiredProps } = require("../common/utils");
// const validateProps = validProps([
//   "id",
//   "title",
//   "createAt",
//   "thumbnail",
//   "content",
// ]);
// const validateRequired = requiredProps(["title", "createAt"]);
const PAGE_TABLE = "pages";

module.exports = {
  async findByBatch(limit = 100) {
    return knex.select("*").from(PAGE_TABLE).limit(limit);
  },
  async create(page) {
    console.log(page);
    // validateRequired(validProps(page));
    console.log(page);
    return knex
      .insert(page)
      .into(PAGE_TABLE)
      .returning("*")
      .then((res) => res[0]);
  },
  async findById(id) {
    return knex.select("*").from(PAGE_TABLE).where({ id }).first();
  },
  async update(page) {
    // validateRequired(validateProps(page));
    return knex(PAGE_TABLE)
      .where({ id: page.id })
      .update(page)
      .returning("*")
      .then((res) => res[0]);
  },
};
