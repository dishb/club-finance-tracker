import multer from "multer";
import express from "express";
import FormData from "form-data";
import axios from "axios";
import next from "next";

const app = express();
const dev = true;
const nextApp = next({ dev });
const port = 3000;
const MINDEE_API_KEY = "db0209cf843804925d5a51f6754e288e";
const upload = multer({ storage: multer.memoryStorage() });

nextApp.prepare().then(() => {
  app.post("/upload-receipt", upload.single("receipt"), async (req, res) => {
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

      const items = (prediction.line_items || []).map((line) => ({
        name: line.description?.value || "Unknown Item",
        quantity: line.quantity?.value || 1,
        price: line.unit_price?.value || 0,
      }));

      res.json({
        total: +total.toFixed(2),
        items: items.map((item) => ({
          name: item.name,
          quantity: item.quantity,
          price: item.price,
          total: +(item.quantity * item.price).toFixed(2),
        })),
      });
    } catch (err) {
      console.error("Mindee OCR error:", err?.response?.data || err.message);
      res.status(500).json({ error: "Failed to process receipt." });
    }
  });

  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
});
