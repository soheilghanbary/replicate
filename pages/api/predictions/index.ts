import Replicate from "replicate";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN!,
});

export default async function handler(req: any, res: any): Promise<void> {
  if (!process.env.REPLICATE_API_TOKEN) {
    throw new Error("Error Generate");
  }

  const prediction = await replicate.predictions.create({
    version: "601eea49d49003e6ea75a11527209c4f510a93e2112c969d548fbb45b9c4f19f",
    input: { ...req },
  });

  if (prediction?.error) {
    res.statusCode = 500;
    res.end(JSON.stringify({ detail: prediction.error }));
    return;
  }

  res.statusCode = 201;
  res.end(JSON.stringify(prediction));
}
