/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.up = function (knex) {
  return knex.schema.createTable("pages", (table) => {
    table.increments("id").primary().notNullable();
    table.string("title").notNullable();
    table.dateTime("createAt").notNullable(); //TODO: 現在時間を入力する
    table.string("thumbnail"); //TODO: URLのバリデーションとかある？
    table.string("content");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("pages");
};
