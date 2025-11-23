"use client";

import { useState } from "react";
import QuizResult from "./quiz-result";

type Question = {
  question: string;
  options: { text: string; animal: string }[];
};

const questions: Question[] = [
  {
    question: "What is your favorite activity?",
    options: [
      { text: "Chasing mice", animal: "cat" },
      { text: "Playing fetch", animal: "dog" },
      { text: "Hunting in the forest", animal: "fox" },
      { text: "Nibbling on seeds", animal: "hamster" },
      { text: "Galloping", animal: "horse" },
    ],
  },
  {
    question: "Which environment do you prefer?",
    options: [
      { text: "Home", animal: "cat" },
      { text: "Open field", animal: "dog" },
      { text: "Forest", animal: "fox" },
      { text: "Cage", animal: "hamster" },
      { text: "Pasture", animal: "horse" },
    ],
  },
  {
    question: "What is your personality like?",
    options: [
      { text: "Independent", animal: "cat" },
      { text: "Friendly", animal: "dog" },
      { text: "Clever", animal: "fox" },
      { text: "Curious", animal: "hamster" },
      { text: "Strong", animal: "horse" },
    ],
  },
  {
    question: "What is your favorite food?",
    options: [
      { text: "Fish", animal: "cat" },
      { text: "Bones", animal: "dog" },
      { text: "Insects", animal: "fox" },
      { text: "Seeds", animal: "hamster" },
      { text: "Grass", animal: "horse" },
    ],
  },
  {
    question: "How do you like to spend your day?",
    options: [
      { text: "Sleeping", animal: "cat" },
      { text: "Playing", animal: "dog" },
      { text: "Exploring", animal: "fox" },
      { text: "Running in a wheel", animal: "hamster" },
      { text: "Running", animal: "horse" },
    ],
  },
];

export default function Quiz() {
  const [current, setCurrent] = useState(0);
  const [scores, setScores] = useState<Record<string, number>>({});
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (animal: string) => {
    setScores((prev) => ({
      ...prev,
      [animal]: (prev[animal] ?? 0) + 1,
    }));
    if (current + 1 < questions.length) {
      setCurrent(current + 1);
    } else {
      setShowResult(true);
    }
  };

  const reset = () => {
    setCurrent(0);
    setScores({});
    setShowResult(false);
  };

  if (showResult) {
    const maxAnimal = Object.entries(scores).reduce(
      (a, b) => (b[1] > a[1] ? b : a),
      ["", 0]
    )[0];
    return <QuizResult animal={maxAnimal} onRetake={reset} />;
  }

  const q = questions[current];
  const shuffled = [...q.options].sort(() => Math.random() - 0.5);

  return (
    <div className="w-full max-w-md">
      <h2 className="text-xl mb-4">{q.question}</h2>
      <div className="flex flex-col gap-2">
        {shuffled.map((opt) => (
          <button
            key={opt.text}
            className="px-4 py-2 bg-primary text-primary-foreground rounded"
            onClick={() => handleAnswer(opt.animal)}
          >
            {opt.text}
          </button>
        ))}
      </div>
    </div>
  );
}
