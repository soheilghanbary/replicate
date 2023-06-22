"use client";

import { Button } from "@/components/ui/button";
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
import { useRef } from "react";

export default function ModelsPage() {
  const promptRef = useRef<HTMLInputElement | null>();

  return (
    <div className="flex space-x-8 py-2">
      <div className="w-64 space-y-4">
        <h3>Input Details</h3>
        <Input ref={promptRef} type={"text"} placeholder="prompt" />
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Image Dimensions" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="512">512x512</SelectItem>
            <SelectItem value="768">768x768</SelectItem>
          </SelectContent>
        </Select>
        <Input type={"text"} placeholder="Negative prompt" />
        <div className="flex">
          <Label className="mr-4">Output</Label>
          <Slider defaultValue={[0]} max={4} step={1} />
        </div>
        <Button variant={"default"} className="w-full">
          Create Image
        </Button>
      </div>
      <div className="flex-1">
        <h2 className="mb-4 text-4xl font-semibold">Output</h2>
      </div>
    </div>
  );
}
