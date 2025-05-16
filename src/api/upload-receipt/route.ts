import * as mindee from "mindee";

export async function POST(req: Request) {
  const formData = await req.formData();

  const mindeeClient = new mindee.Client({
    apiKey: "f7f59e8b3667f25e88ca8e1ef1fe0a26",
  });

  //! Error: Fix the form data for the Mindee integration, there is an error on line 12.
  const inputSource = mindeeClient.docFromStream(
    formData.get("stream"),
    formData.get("fileName"),
  );

  const res = mindeeClient
    .parse(mindee.product.ReceiptV5, inputSource)
    .then((res) => {
      return Response.json(res.document.inference.prediction);
    });
}
