import multer from "multer";
import dotenv from "dotenv";
import FormData from "form-data";
import axios from "axios";
import express from "express";
import MulterRequest from "@/types/multerRequest";
import OcrResponse from "@/types/ocrResponse";
import ReceiptItem from "@/types/receiptItem";

dotenv.config();

const app = express();
const port = 3000;

const API_KEY = process.env.NANONETS_API_KEY!;
const MODEL_ID = process.env.MODEL_ID!;

const upload = multer({ storage: multer.memoryStorage() });

app.post(
  "/upload-receipt",
  upload.single("receipt"),
  async (req: MulterRequest, res: express.Response): Promise<void> => {
    const file = req.file;
    if (!file) {
      res.status(400).json({ error: "Error: No file was uploaded." });
      return;
    }

    const form = new FormData();
    form.append("file", file.buffer, {
      filename: file.originalname,
      contentType: file.mimetype,
    });

    try {
      const response = await axios.post<OcrResponse>(
        `https://app.nanonets.com/api/v2/OCR/Model/${MODEL_ID}/LabelFile/`,
        form,
        {
          headers: {
            ...form.getHeaders(),
            Authorization:
              "Basic " + Buffer.from(`${API_KEY}:`).toString("base64"),
          },
        }
      );

      const predictions = response.data.result[0]?.prediction;

      if (!predictions || predictions.length === 0) {
        res.status(500).json({
          error: "Error: No predictions retrieved from the OCR.",
        });
        return;
      }

      const items: ReceiptItem[] = [];
      let total = 0;

      for (const field of predictions) {
        const label = field.label.toLowerCase();
        const value = field.ocr_text;

        if (label.includes("total") && !total) {
          const match = parseFloat(value.replace(/[^0-9.]/g, ""));
          if (!isNaN(match)) total = match;
        }

        if (label.includes("item") || label.includes("product")) {
          items.push({ name: value, quantity: 1, price: 0 });
        }

        if (
          (label.includes("price") || label.includes("amount")) &&
          items.length
        ) {
          const price = parseFloat(value.replace(/[^0-9.]/g, ""));
          if (!isNaN(price)) items[items.length - 1].price = price;
        }

        if (label.includes("qty") && items.length) {
          const qty = parseInt(value);
          if (!isNaN(qty)) items[items.length - 1].quantity = qty;
        }
      }

      res.json({
        total,
        items: items.map((item) => ({
          name: item.name,
          quantity: item.quantity,
          price: item.price,
          total: +(item.quantity * item.price).toFixed(2),
        })),
      });
    } catch (err: any) {
      console.error("OCR error:", err?.response?.data || err.message);
      res.status(500).json({ error: "Error: Failed to process receipt." });
    }
  }
);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
