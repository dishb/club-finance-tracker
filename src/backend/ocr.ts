import * as mindee from "mindee";
import dotenv from "dotenv";

dotenv.config();

function toBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const base64String = (reader.result as string).split(",")[1];
      resolve(base64String);
    };
    reader.onerror = (error) => reject(error);
  });
}

async function ocrExtractData(file: File, name: string) {
  const API_KEY = process.env.MINDEE_API_KEY!;
  const mindeeClient = new mindee.Client({ apiKey: API_KEY });
  const base64String = await toBase64(file);
  const inputSource = mindeeClient.docFromBase64(base64String, name);
  const apiResponse = await mindeeClient.parse(
    mindee.product.ReceiptV5,
    inputSource
  );
  return apiResponse.document;
}

export default ocrExtractData;
