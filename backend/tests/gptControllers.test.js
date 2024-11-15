const request = require("supertest");
const { expressServer } = require("../app");
const { factroryError } = require("../common/utils");
const { describe } = require("node:test");
const openai = require("../openai");
const s3 = require("../s3");
require("dotenv").config({ path: "./env.local" });
const app = expressServer();

describe("gptの単体テスト", () => {
  let mockurl = {
    data: [
      {
        url: `https://${process.env.S3_BUCKET_NAME}.s3.ap-northeast-1.amazonaws.com/images/BNciSggAa4`,
      },
    ],
  };
  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe("POST - /api/gpt のテスト", () => {
    test("imageを生成できる", async () => {
      const spyGpt = jest
        .spyOn(openai.images, "generate")
        .mockImplementation(() => mockurl);
      const spyS3 = jest.spyOn(s3, "send").mockImplementation(() => "");
      const res = await request(app)
        .post("/api/gpt")
        .send({ content: "内容hogehoge" });
      expect(res.body).toEqual({
        url: expect.stringContaining(
          `https://${process.env.S3_BUCKET_NAME}.s3.ap-northeast-1.amazonaws.com`
        ),
      });
      expect(res.status).toEqual(200);
    });
    test("imageの生成を失敗すると 500 が返る", async () => {
      spy = jest.spyOn(openai.images, "generate").mockRejectedValue(Error());
      spy = jest.spyOn(s3, "send").mockRejectedValue(Error());
      const res = await request(app)
        .post("/api/gpt")
        .send({ content: "内容hogehoge" });
      expect(JSON.parse(res.error.text).error).toEqual(
        "Failed to generate image"
      );
      expect(res.error.status).toEqual(500);
    });
  });
});
