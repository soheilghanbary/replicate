import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { useSetAtom } from "jotai/react";
import { useState } from "react";
import { predictionAtom } from "./output-images";

interface InputDetailsProps {
  promptRef: React.RefObject<HTMLInputElement>;
  negativeRef: React.RefObject<HTMLInputElement>;
}

const IMAGE_DIMENSIONS_OPTIONS = [
  { label: "512x512", value: "512" },
  { label: "768x768", value: "768" },
];

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
const InputDetails: React.FC<InputDetailsProps> = ({
  promptRef,
  negativeRef,
}) => {
  const setPrediction = useSetAtom(predictionAtom);
  const [error, setError] = useState(null);
  const onCreateImage = async () => {
    const response = await fetch("/api/predictions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: promptRef.current?.value,
        num_outputs: 3,
        num_inference_steps: 50,
        guidance_scale: 7.5,
        image_dimensions: "512x512",
      }),
    });
    let prediction = await response.json();
    if (response.status !== 201) {
      setError(prediction.detail);
      return;
    }
    setPrediction(prediction);

    while (
      prediction.status !== "succeeded" &&
      prediction.status !== "failed"
    ) {
      await sleep(1000);
      const response = await fetch("/api/predictions/" + prediction.id);
      prediction = await response.json();
      if (response.status !== 200) {
        setError(prediction.detail);
        return;
      }
      setPrediction(prediction);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Input Details</CardTitle>
      </CardHeader>
      <CardContent className="w-72 space-y-4">
        <Input ref={promptRef} type="text" placeholder="prompt" />
        <Select onValueChange={(e) => console.log(e)}>
          <SelectTrigger>
            <SelectValue placeholder="Image Dimensions" />
          </SelectTrigger>
          <SelectContent>
            {IMAGE_DIMENSIONS_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Input ref={negativeRef} type="text" placeholder="Negative prompt" />
        <div className="flex">
          <Label className="mr-4">Output</Label>
          <Slider defaultValue={[0]} max={3} step={1} />
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={onCreateImage} variant="default" className="w-full">
          Create Image
        </Button>
      </CardFooter>
    </Card>
  );
};

export default InputDetails;
