"use client";

import { useRef } from "react";
import InputDetails from "./input-details";
import OutputImages from "./output-images";

export default function ModelsPage() {
  const promptInputRef = useRef<HTMLInputElement | null>(null);
  const negativeInputRef = useRef<HTMLInputElement | null>(null);

  return (
    <div className="flex space-x-8 py-2">
      <div>
        <InputDetails
          promptRef={promptInputRef}
          negativeRef={negativeInputRef}
        />
      </div>
      <OutputImages />
    </div>
  );
}
