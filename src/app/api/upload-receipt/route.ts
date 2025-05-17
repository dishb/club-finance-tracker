import * as mindee from "mindee";

export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get("file") as File;

  if (!file) {
    return new Response("No file uploaded", { status: 400 });
  }

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const fileName = file.name;

  const mindeeClient = new mindee.Client({
    apiKey: "f7f59e8b3667f25e88ca8e1ef1fe0a26",
  });

  const inputSource = mindeeClient.docFromBuffer(buffer, fileName);
  const res = await mindeeClient.enqueueAndParse(mindee.product.ReceiptV5, inputSource);

  return Response.json(res.document?.inference.prediction);
}
