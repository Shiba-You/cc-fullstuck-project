const openai = require("../openai");
const { getRandomID } = require("../common/utils");
const { PutObjectCommand } = require("@aws-sdk/client-s3");
const s3 = require("../s3");
require("dotenv").config({ path: ".env.local" });

const generateImage = async (req, res) => {
  try {
    // GPTでの画像生成
    const imageUrl = (
      await openai.images.generate({
        model: "dall-e-3",
        prompt: `あなたは絵日記を書いている画家です。以下に絵日記の文章を記述するので、その内容に相応しい絵を出力してください。 # 絵日記内容：${req.body.content}`,
        n: 1,
        size: "1024x1024",
      })
    ).data[0].url;

    // S3に格納
    const image = await fetch(imageUrl);
    const imageArrayBuffer = await image.arrayBuffer();
    const imageBuffer = Buffer.from(imageArrayBuffer);
    const imagePath = `images/${getRandomID(10)}`;
    const uploadParams = {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: imagePath,
      Body: imageBuffer,
      ContentType: image.headers.get("content-type"),
    };

    const _ = await s3.send(new PutObjectCommand(uploadParams));
    res.status(200).send({
      url: `https://${process.env.S3_BUCKET_NAME}.s3.ap-northeast-1.amazonaws.com/${imagePath}`,
    });
  } catch (e) {
    res.status(500).json({ error: "Failed to generate image" });
  }
};

module.exports = { generateImage };
