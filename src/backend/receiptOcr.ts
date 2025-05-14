import Tesseract from "tesseract.js";
import path from "path";
import ReceiptItem from "@/types/receiptItem";

function extractItemsfromText(text: string) {
  const lines = text
    .split("\n")
    .map((line: string) => line.trim())
    .filter(Boolean);
  const itemRegex = /^(.+?)(?:\s+(\d+)\s*[xX]\s*)?[\s$]*(\d+\.\d{2})$/;

  const items: ReceiptItem[] = [];

  for (const line of lines) {
    const match = line.match(itemRegex);
    if (match) {
      const name = match[1].trim();
      const quantity = match[2] ? parseInt(match[2], 10) : undefined;
      const price = parseFloat(match[3]);

      if (!isNaN(price) && price > 0) {
        //! Error: Incorrect properties, see the corrresponding TS interface.
        items.push({ text, total, quantity });
      }
    }
  }
  return items;
}

function extractReceiptMetadata(text: string) {
  const metadata: Partial<ReceiptItem> = {};

  const totalMatch = text.match(/total[\s:]*[$]?(\d+\.\d{2})/i);
  if (totalMatch) {
    metadata.total = parseFloat(totalMatch[1]);
  }
  const taxMatch = text.match(/(?:tax|vat|gst)[\s:]*[$]?(\d+\.\d{2})/i);
  if (taxMatch) {
    metadata.tax = parseFloat(taxMatch[1]);
  }
  const subtotalMatch = text.match(
    /(?:subtotal|sub-total|sub total)[\s:]*[$]?(\d+\.\d{2})/i
  );
  if (subtotalMatch) {
    metadata.subtotal = parseFloat(subtotalMatch[1]);
  }
  const dateMatch = text.match(/(\d{1,2})[\/\-\.](\d{1,2})[\/\-\.](\d{2,4})/);
  if (dateMatch){
    const first = parseInt(dateMatch[1], 10);
    const second = parseInt(dateMatch[2], 10);
    let month, day, year;

    if (first > 12 && second <= 12){P
        day = first;
        month = second;
    }
    else{
        month = first;
        day = second;
    }
    year = parseInt(dateMatch[3], 10);

    if(year < 100){
        year += year < 50 ? 2000 : 1900;
    }
    metadata.date = new Date(year, month-1, day);
  }

  const lines = text,split('\n').map(line => line.trim()).filter(Boolean);
  if (lines.length>0){
    const vendorLine = lines.find(line => !/^\d+(\.\d+)?$/.test(line));
    if(vendorLine){
        metadata.vendor = vendorLine;
    }
  }
  return metadata;
}

//method to validate the receipt
function validateReceipt(receipt: Receipt): Receipt{
    
}