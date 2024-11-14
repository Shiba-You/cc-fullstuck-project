const { timeStamp } = require("console");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("pages").del();
  await knex("pages").insert([
    {
      id: 1,
      title: "title1",
      createAt: "2024-11-11",
      thumbnail: "",
      content: "content1",
    },
    {
      id: 2,
      title: "title2",
      createAt: "2024-11-12",
      thumbnail: "",
      content: "content2",
    },
    {
      id: 3,
      title: "title3",
      createAt: "2024-11-13",
      thumbnail: "",
      content: "content3",
    },
  ]);
};
