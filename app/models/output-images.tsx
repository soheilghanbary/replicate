import { atom } from "jotai";
import { useAtomValue } from "jotai/react";
import Image from "next/image";

export const predictionAtom = atom({ output: [] });

const OutputImages = () => {
  const prediction = useAtomValue(predictionAtom);
  return (
    <div className="flex-1">
      <h2 className="mb-4 text-4xl font-semibold">Output</h2>
      <div className="grid grid-cols-3 gap-8">
        {/* <div className="h-80 w-full rounded-lg bg-secondary"></div> */}
        {prediction.output &&
          prediction.output.map((image) => (
            <div
              className="relative aspect-square h-96 w-full rounded-lg bg-secondary"
              key={image}
            >
              <Image
                fill
                className="rounded-lg bg-cover object-cover"
                src={image}
                alt="rendered"
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default OutputImages;
