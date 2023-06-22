import Replicate from "replicate";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN!,
});

export default async function handler(req: any, res: any): Promise<void> {
  if (!process.env.REPLICATE_API_TOKEN) {
    throw new Error("Error Generate");
  }

  const prediction = await replicate.predictions.create({
    version: "db21e45d3f7023abc2a46ee38a23973f6dce16bb082a930b0c49861f96d1e5bf",
    input: { prompt: req.body.prompt },
  });

  if (prediction?.error) {
    res.statusCode = 500;
    res.end(JSON.stringify({ detail: prediction.error }));
    return;
  }

  res.statusCode = 201;
  res.end(JSON.stringify(prediction));
}
