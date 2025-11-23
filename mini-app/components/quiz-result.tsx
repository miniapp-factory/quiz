"use client";

import { Button } from "@/components/ui/button";

export default function QuizResult({
  animal,
  onRetake,
}: {
  animal: string;
  onRetake: () => void;
}) {
  const imageSrc = `/${animal}.png`;
  const titleMap: Record<string, string> = {
    cat: "Cat",
    dog: "Dog",
    fox: "Fox",
    hamster: "Hamster",
    horse: "Horse",
  };
  return (
    <div className="flex flex-col items-center gap-4">
      <h2 className="text-2xl">You are most like a {titleMap[animal]}!</h2>
      <img
        src={imageSrc}
        alt={titleMap[animal]}
        width={512}
        height={512}
        className="rounded"
      />
      <Button onClick={onRetake}>Retake Quiz</Button>
    </div>
  );
}
