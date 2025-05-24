import { processReceipt, validateReceipt } from "./mindeetrying";
import connectDB from "@/lib/mongodb";
import { Receipt } from "@/models/ReceiptModel";
import { writeFile } from "fs/promises";
import { join } from "path";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return Response.json({ error: "No file provided" }, { status: 400 });
    }

    // Process the receipt using Mindee
    const processedReceipt = await processReceipt(file);

    // Validate the processed receipt
    if (!validateReceipt(processedReceipt)) {
      return Response.json(
        { error: processedReceipt.error || "Invalid receipt data" },
        { status: 400 }
      );
    }

    // Save the file to the public directory
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const fileName = `${Date.now()}-${file.name}`;
    const path = join(process.cwd(), "public", "receipts", fileName);
    await writeFile(path, buffer);

    // Connect to MongoDB
    await connectDB();

    // Save receipt data to MongoDB
    const receipt = await Receipt.create({
      ...processedReceipt,
      imageUrl: `/receipts/${fileName}`,
    });

    return Response.json(receipt);
  } catch (error) {
    console.error("Error processing request:", error);
    return Response.json(
      { error: "Failed to process receipt" },
      { status: 500 }
    );
  }
}
