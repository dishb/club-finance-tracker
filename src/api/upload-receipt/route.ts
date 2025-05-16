import * as mindee from "mindee";

export async function POST(req: Request) {
  const formData = await req.formData();

  const mindeeClient = new mindee.Client({
    apiKey: "f7f59e8b3667f25e88ca8e1ef1fe0a26",
  });

  //TODO: Finish implementing Mindee's API for OCR inference.
  const inputSource = mindeeClient.docFromBuffer();

  const res = mindeeClient
    .parse(mindee.product.ReceiptV5, inputSource)
    .then((res) => {
      return Response.json(res.document.inference.prediction);
    });
}
