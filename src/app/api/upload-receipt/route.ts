export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get("file") as File;

  if (!file) {
    return new Response("No file uploaded", { status: 400 });
  }

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const fileName = file.name;

  const url =
    "https://api.mindee.net/v1/products/mindee/expense_receipts/v5/predict";
  const apiKey = "f7f59e8b3667f25e88ca8e1ef1fe0a26";

  if (!apiKey) {
    return new Response("Mindee API key not set", { status: 500 });
  }

  const mindeeForm = new FormData();
  mindeeForm.append("document", new Blob([buffer]), fileName);

  const mindeeRes = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Token ${apiKey}`,
    },
    body: mindeeForm,
  });

  if (!mindeeRes.ok) {
    const errorText = await mindeeRes.text();
    return new Response(`Mindee API error: ${errorText}`, {
      status: mindeeRes.status,
    });
  }

  const res = await mindeeRes.json();

  return Response.json(res.document.inference.prediction);
}
