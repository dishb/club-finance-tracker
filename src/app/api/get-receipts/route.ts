import dbConnect from "@/lib/dbConnect";
import ReceiptModel from "@/models/ReceiptModel";
import { NextResponse } from "next/server";

export async function GET() {
  await dbConnect();

  try {
    const receipts = await ReceiptModel.find({});
    return NextResponse.json(receipts, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
