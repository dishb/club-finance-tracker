import { Document } from "mongoose";

export default interface Receipt extends Document {
  merchant: string;
  total: number;
  tax: number;
  date: Date;
  time: string;
}
