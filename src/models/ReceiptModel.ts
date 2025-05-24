import mongoose, { Schema } from "mongoose";
import Receipt from "@/types/receipt";

const receiptSchema: Schema = new mongoose.Schema({
  merchant: { type: String, required: true },
  total: { type: Number, required: true },
  tax: { type: Number, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
});

const ReceiptModel = mongoose.models.ReceiptModel || mongoose.model<Receipt>("ReceiptModel", receiptSchema);
export default ReceiptModel;
