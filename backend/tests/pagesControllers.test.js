const request = require("supertest");
const { expressServer } = require("../app");
const { factroryError } = require("../common/utils");
const pageModel = require("../models/pageModel");
const { describe } = require("node:test");
const app = expressServer();

describe("pageの単体テスト", () => {
  let mockPages;
  let newPage;
  let spy;
  beforeAll(() => {
    mockPages = [
      {
        id: 1,
        title: "title 1",
        createAt: "2024-11-11",
        thumbnail: "thmbnail 1",
        content: "content 1",
      },
      {
        id: 2,
        title: "title 2",
        createAt: "2024-11-12",
        thumbnail: "thmbnail 2",
        content: "content 2",
      },
      {
        id: 3,
        title: "title 3",
        createAt: "2024-11-13",
        thumbnail: "thmbnail 3",
        content: "content 3",
      },
    ];
    newPage = {
      id: 4,
      title: "title 4",
      createAt: "2024-11-14",
      thumbnail: "thmbnail 4",
      content: "content 4",
    };
  });
  afterEach(() => {
    spy.mockRestore();
  });

  describe("GET - /api/pages のテスト", () => {
    test("全てのpageを取得できる", async () => {
      spy = jest
        .spyOn(pageModel, "findByBatch")
        .mockImplementation(() => mockPages);
      const res = await request(app).get("/api/pages");
      expect(res.body).toEqual(mockPages);
      expect(res.status).toEqual(200);
    });
    test("pageの取得に失敗するとステータスコード 500 が返る", async () => {
      spy = jest
        .spyOn(pageModel, "findByBatch")
        .mockRejectedValue(factroryError("Failed to get all pages", 500));
      const res = await request(app).get("/api/pages");
      expect(JSON.parse(res.error.text).error).toEqual(
        "Failed to get all pages"
      );
      expect(res.error.status).toEqual(500);
    });
  });

  describe("POST - /api/pages のテスト", () => {
    test("pageを追加できる", async () => {
      spy = jest
        .spyOn(pageModel, "create")
        .mockImplementation(() => newPage.id);
      const res = await request(app).post("/api/pages").send(newPage);
      expect(res.body).toEqual(newPage.id);
      expect(res.status).toEqual(201);
    });
    test("titleが空の時、ステータスコード 400 が返る", async () => {
      spy = jest
        .spyOn(pageModel, "create")
        .mockRejectedValue(factroryError("Title is required field", 400));
      const res = await request(app)
        .post("/api/pages")
        .send({ ...newPage, title: "" });
      expect(JSON.parse(res.error.text).error).toEqual(
        "Title is required field"
      );
      expect(res.error.status).toEqual(400);
    });
    test("pageの作成に失敗した時、ステータスコード 500 が返る", async () => {
      spy = jest
        .spyOn(pageModel, "create")
        .mockRejectedValue(factroryError("Failed to create page", 500));
      const res = await request(app).post("/api/pages").send(newPage);
      expect(JSON.parse(res.error.text).error).toEqual("Failed to create page");
      expect(res.error.status).toEqual(500);
    });
  });

  describe("GET - /api/pages/:id のテスト", () => {
    test(":idを持つpageを取得できる", async () => {
      spy = jest
        .spyOn(pageModel, "findById")
        .mockImplementation(() => mockPages[0]);
      const res = await request(app).get(`/api/pages/${mockPages[0].id}`);
      expect(res.body).toEqual(mockPages[0]);
      expect(res.status).toEqual(200);
    });
    // test(":idを持つpageがない時、ステータスコード 404 が返る", async () => {
    //   spy = jest.spyOn(pageModel, "findById").mockImplementation(() => []);
    //   const res = await request(app).get("/api/pages/100");
    //   expect(JSON.parse(res.error.text).error).toEqual(
    //     "Request Page Not Found"
    //   );
    //   expect(res.error.status).toEqual(404);
    // });
    test("pageの作成に失敗した時、ステータスコード 500 が返る", async () => {
      spy = jest
        .spyOn(pageModel, "findById")
        .mockRejectedValue(factroryError("Failed to get page", 500));
      const res = await request(app).get("/api/pages/1");
      expect(JSON.parse(res.error.text).error).toEqual("Failed to get page");
      expect(res.error.status).toEqual(500);
    });
  });

  describe("PUT - /api/pages/:id のテスト", () => {
    test(":idを持つpageを編集できる", async () => {
      const updatedPage = {
        ...mockPages[0],
        content: `(Edited) ${mockPages[0].content}`,
      };
      spy = jest
        .spyOn(pageModel, "update")
        .mockImplementation(() => updatedPage);
      const res = await request(app)
        .put(`/api/pages/${mockPages[0].id}`)
        .send(updatedPage);
      expect(res.body).toEqual(updatedPage);
      expect(res.status).toEqual(200);
    });
    // test(":idを持つpageがない時、ステータスコード 404 が返る", async () => {
    //   const updatedPage = {
    //     ...mockPages[0],
    //     content: `(Edited) ${mockPages[0].content}`,
    //     id: 100,
    //   };
    //   spy = jest.spyOn(pageModel, "update").mockImplementation(() => []);
    //   const res = await request(app)
    //     .put(`/api/pages/${updatedPage.id}`)
    //     .send(updatedPage);
    //   expect(JSON.parse(res.error.text).error).toEqual(
    //     "Request Page Not Found"
    //   );
    //   expect(res.error.status).toEqual(404);
    // });
    test("Id, Title, createAtが空の時、ステータスコード 400 が返る", async () => {
      const updatedPage = {
        ...mockPages[0],
        content: `(Edited) ${mockPages[0].content}`,
        title: "",
        Id: "",
        createAt: "",
      };
      spy = jest
        .spyOn(pageModel, "update")
        .mockRejectedValue(
          factroryError("Id, Title, createAt is required field", 400)
        );
      const res = await request(app)
        .put(`/api/pages/${updatedPage.id}`)
        .send(updatedPage);
      expect(JSON.parse(res.error.text).error).toEqual(
        "Id, Title, createAt is required field"
      );
      expect(res.error.status).toEqual(400);
    });
    test("paramの:idとbodyのidが一致しない時、ステータスコード 400 が返る", async () => {
      const updatedPage = {
        ...mockPages[0],
        content: `(Edited) ${mockPages[0].content}`,
        id: 100,
      };
      spy = jest
        .spyOn(pageModel, "update")
        .mockRejectedValue(factroryError("Failed to update page", 400));
      const res = await request(app).put(`/api/pages/1`).send(updatedPage);
      expect(JSON.parse(res.error.text).error).toEqual("Failed to update page");
      expect(res.error.status).toEqual(400);
    });
    test("pageの作成に失敗した時、ステータスコード 500 が返る", async () => {
      const updatedPage = {
        ...mockPages[0],
        content: `(Edited) ${mockPages[0].content}`,
      };
      spy = jest
        .spyOn(pageModel, "update")
        .mockRejectedValue(factroryError("Failed to update page", 500));
      const res = await request(app)
        .put(`/api/pages/${updatedPage.id}`)
        .send(updatedPage);
      expect(JSON.parse(res.error.text).error).toEqual("Failed to update page");
      expect(res.error.status).toEqual(500);
    });
  });
});
