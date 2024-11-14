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
      spy = jest.spyOn(pageModel, "add").mockImplementation(() => newPage.id);
      const res = await request(app).post("/api/pages").send(newPage);
      expect(res.body).toEqual(newPage.id);
      expect(res.status).toEqual(201);
    });
    test("titleが空の時、ステータスコード 400 が返る", async () => {
      spy = jest
        .spyOn(pageModel, "add")
        .mockRejectedValue(factroryError("Title is required field", 400));
      const res = await request(app).post("/api/pages");
      expect(JSON.parse(res.error.text).error).toEqual(
        "Title is required field"
      );
      expect(res.error.status).toEqual(400);
    });
    test("pageの作成に失敗した時、ステータスコード 500 が返る", async () => {
      spy = jest
        .spyOn(pageModel, "add")
        .mockRejectedValue(factroryError("Failed to create page", 500));
      const res = await request(app).post("/api/pages");
      expect(JSON.parse(res.error.text).error).toEqual("Failed to create page");
      expect(res.error.status).toEqual(500);
    });
  });

  describe("GET - /api/pages/:id のテスト", () => {
    test(":idを持つpageを取得できる", async () => {
      await Promise.all(
        mockPages.map(async (page) => {
          spy = jest
            .spyOn(pageModel, "findById")
            .mockImplementation(() => page);
          const res = await request(app).get(`/api/pages/${page.id}`);
          expect(res.body).toEqual(page);
          expect(res.status).toEqual(200);
        })
      );
    });
    test(":idを持つpageがない時、ステータスコード 404 が返る", async () => {
      spy = jest
        .spyOn(pageModel, "findById")
        .mockRejectedValue(factroryError("Request Page Not Found", 404));
      const res = await request(app).get("/api/pages/100");
      expect(JSON.parse(res.error.text).error).toEqual(
        "Request Page Not Found"
      );
      expect(res.error.status).toEqual(404);
    });
    test("pageの作成に失敗した時、ステータスコード 500 が返る", async () => {
      spy = jest
        .spyOn(pageModel, "add")
        .mockRejectedValue(factroryError("Failed to get page", 500));
      const res = await request(app).get("/api/pages/1");
      expect(JSON.parse(res.error.text).error).toEqual("Failed to get page");
      expect(res.error.status).toEqual(500);
    });
  });

  describe("PUT - /api/pages/:id のテスト", () => {
    test(":idを持つpageを編集できる", async () => {
      await Promise.all(
        mockPages.map(async (page) => {
          const editedPage = { ...page, content: `(Edited) ${page.content}` };
          spy = jest
            .spyOn(pageModel, "edit")
            .mockImplementation(() => editedPage);
          const res = await request(app)
            .put(`/api/pages/${page.id}`)
            .send(editedPage);
          expect(res.body).toEqual(editedPage);
          expect(res.status).toEqual(200);
        })
      );
    });
    test(":idを持つpageがない時、ステータスコード 404 が返る", async () => {
      const editedPage = {
        ...mockPages[0],
        content: `(Edited) ${mockPage[0].content}`,
        id: 100,
      };
      spy = jest
        .spyOn(pageModel, "edit")
        .mockRejectedValue(factroryError("Request Page Not Found", 404));
      const res = await request(app)
        .put(`/api/pages/${editedPage.id}`)
        .send(editedPage);
      expect(JSON.parse(res.error.text).error).toEqual(
        "Request Page Not Found"
      );
      expect(res.error.status).toEqual(404);
    });
    test("titleが空の時、ステータスコード 400 が返る", async () => {
      const editedPage = {
        ...mockPages[0],
        content: `(Edited) ${mockPage[0].content}`,
        title: "",
      };
      spy = jest
        .spyOn(pageModel, "edit")
        .mockRejectedValue(factroryError("Title is required field", 400));
      const res = await request(app)
        .put(`/api/pages/${editedPage.id}`)
        .send(editedPage);
      expect(JSON.parse(res.error.text).error).toEqual(
        "Title is required field"
      );
      expect(res.error.status).toEqual(400);
    });
    test("pageの作成に失敗した時、ステータスコード 500 が返る", async () => {
      const editedPage = {
        ...mockPages[0],
        content: `(Edited) ${mockPage[0].content}`,
      };
      spy = jest
        .spyOn(pageModel, "add")
        .mockRejectedValue(factroryError("Failed to edit page", 500));
      const res = await request(app)
        .put(`/api/pages/${editedPage.id}`)
        .send(editedPage);
      expect(JSON.parse(res.error.text).error).toEqual("Failed to edit page");
      expect(res.error.status).toEqual(500);
    });
  });
});
