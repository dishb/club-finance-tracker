import multer from "multer";
import express from "express";
import FormData from "form-data";
import axios from "axios";
import type { Request, Response } from "express";
import next from "next";

type ReceiptItem = {
  name: string;
  quantity: number;
  price: number;
};

const port = 3000;
const app = next({});
const MINDEE_API_KEY = "b356287bae20a5018904645b50bc7da0";

app.prepare().then(() => {
  const server = express();
  const upload = multer({ storage: multer.memoryStorage() });

  server.post(
    "/upload-receipt",
    upload.single("receipt"),
    async (req: Request, res: Response) => {
      const file = req.file;
      if (!file) {
        res.status(400).json({ error: "No file uploaded." });
        return;
      }

      const form = new FormData();
      form.append("document", file.buffer, {
        filename: file.originalname,
        contentType: file.mimetype,
      });

      try {
        const response = await axios.post(
          "https://api.mindee.net/v1/products/mindee/receipt/v5/predict",
          form,
          {
            headers: {
              ...form.getHeaders(),
              Authorization: `Token ${MINDEE_API_KEY}`,
            },
          }
        );

        const prediction = response.data.document.inference.prediction;
        const total = prediction.total_incl?.value || 0;

        const items: ReceiptItem[] = (prediction.line_items || []).map(
          (line: any) => ({
            name: line.description?.value || "Unknown Item",
            quantity: line.quantity?.value || 1,
            price: line.unit_price?.value || 0,
          })
        );

        res.json({
          total: +total.toFixed(2),
          items: items.map((item) => ({
            name: item.name,
            quantity: item.quantity,
            price: item.price,
            total: +(item.quantity * item.price).toFixed(2),
          })),
        });
      } catch (err: any) {
        console.error("Mindee OCR error:", err?.response?.data || err.message);
        res.status(500).json({ error: "Failed to process receipt." });
      }
    }
  );

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
});
