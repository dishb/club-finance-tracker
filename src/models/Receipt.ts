import mongoose from 'mongoose';

const receiptSchema = new mongoose.Schema({
  merchant: { type: String, required: true },
  total: { type: Number, required: true },
  tax: { type: Number, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  imageUrl: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export const Receipt = mongoose.models.Receipt || mongoose.model('Receipt', receiptSchema); 