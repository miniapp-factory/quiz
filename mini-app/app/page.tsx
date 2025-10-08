"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Share } from "@/components/share";
import { useRouter } from "next/navigation";

// Define the quiz data
const quizQuestions = [
  {
    id: 1,
    question: "What's your ideal vacation spot?",
    options: [
      { text: "A magical castle in the clouds", value: "aurora" },
      { text: "A bustling city with adventure", value: "elsa" },
      { text: "A beautiful garden with nature", value: "belle" },
      { text: "A cozy cottage by the sea", value: "ariel" }
    ]
  },
  {
    id: 2,
    question: "What's your greatest strength?",
    options: [
      { text: "Bravery and determination", value: "mulan" },
      { text: "Kindness and compassion", value: "cinderella" },
      { text: "Intelligence and curiosity", value: "belle" },
      { text: "Independence and courage", value: "jasmine" }
    ]
  },
  {
    id: 3,
    question: "What's your approach to problem-solving?",
    options: [
      { text: "Think logically and carefully", value: "belle" },
      { text: "Use creativity and imagination", value: "aurora" },
      { text: "Trust your instincts", value: "jasmine" },
      { text: "Work hard and persevere", value: "mulan" }
    ]
  },
  {
    id: 4,
    question: "What's your favorite way to spend time?",
    options: [
      { text: "Reading books and learning", value: "belle" },
      { text: "Helping others and making a difference", value: "cinderella" },
      { text: "Exploring new places and cultures", value: "jasmine" },
      { text: "Being with family and friends", value: "aurora" }
    ]
  },
  {
    id: 5,
    question: "What's your biggest dream?",
    options: [
      { text: "To be free and live on your own terms", value: "jasmine" },
      { text: "To make a difference in the world", value: "cinderella" },
      { text: "To find true love", value: "ariel" },
      { text: "To become a leader and protect others", value: "mulan" }
    ]
  }
];

// Define the princess results
const princessResults = {
  ariel: {
    name: "Ariel",
    description: "The adventurous mermaid who dreams of exploring the world above.",
    traits: ["Adventurous", "Curious", "Dreamer", "Optimistic"]
  },
  belle: {
    name: "Belle",
    description: "The book-loving princess who values knowledge and kindness.",
    traits: ["Intelligent", "Kind", "Curious", "Independent"]
  },
  cinderella: {
    name: "Cinderella",
    description: "The kind-hearted princess who finds hope in difficult times.",
    traits: ["Kind", "Patient", "Hopeful", "Resilient"]
  },
  elsa: {
    name: "Elsa",
    description: "The ice queen who learns to embrace her powers and be true to herself.",
    traits: ["Powerful", "Selfless", "Resilient", "Creative"]
  },
  jasmine: {
    name: "Jasmine",
    description: "The fearless princess who values freedom and independence.",
    traits: ["Free-spirited", "Brave", "Independent", "Wise"]
  },
  mulan: {
    name: "Mulan",
    description: "The brave warrior who fights for what's right and protects her family.",
    traits: ["Brave", "Loyal", "Determined", "Selfless"]
  },
  aurora: {
    name: "Aurora",
    description: "The gentle princess who learns to be true to herself and embrace her destiny.",
    traits: ["Gentle", "Kind", "Creative", "Resilient"]
  }
};

export default function Home() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const router = useRouter();

  const handleAnswer = (answer: string) => {
    setSelectedAnswer(answer);
  };

  const handleNext = () => {
    if (selectedAnswer) {
      const newAnswers = [...answers, selectedAnswer];
      setAnswers(newAnswers);
      
      if (currentQuestion < quizQuestions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
      } else {
        // Calculate result
        const result = calculateResult(newAnswers);
        setShowResult(true);
        // Store result in session storage for sharing
        sessionStorage.setItem('quizResult', JSON.stringify(result));
      }
    }
  };

  const calculateResult = (answers: string[]) => {
    // Count occurrences of each princess
    const counts: Record<string, number> = {};
    
    answers.forEach(answer => {
      if (counts[answer]) {
        counts[answer]++;
      } else {
        counts[answer] = 1;
      }
    });
    
    // Find the princess with the most votes
    const maxCount = Math.max(...Object.values(counts));
    const mostVoted = Object.keys(counts).filter(key => counts[key] === maxCount);
    
    // If there's a tie, pick the first one
    const result = mostVoted[0];
    
    return princessResults[result as keyof typeof princessResults] || princessResults.aurora;
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResult(false);
    setSelectedAnswer(null);
  };

  if (showResult) {
    const result = JSON.parse(sessionStorage.getItem('quizResult') || JSON.stringify(princessResults.aurora));
    
    return (
      <main className="flex flex-col gap-6 place-items-center px-4 py-8">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Your Disney Princess</CardTitle>
            <CardDescription>Based on your answers</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-4">
            <div className="text-5xl mb-2">👑</div>
            <h2 className="text-2xl font-bold">{result.name}</h2>
            <p className="text-center">{result.description}</p>
            <div className="flex flex-wrap justify-center gap-2 mt-2">
              {result.traits.map((trait, index) => (
                <span key={index} className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
                  {trait}
                </span>
              ))}
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-3">
            <Share text={`I'm ${result.name}! Find out which Disney Princess you are!`} />
            <Button onClick={resetQuiz} variant="outline">
              Take Quiz Again
            </Button>
          </CardFooter>
        </Card>
      </main>
    );
  }

  const question = quizQuestions[currentQuestion];
  
  return (
    <main className="flex flex-col gap-6 place-items-center px-4 py-8">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Disney Princess Quiz</CardTitle>
          <CardDescription>Answer 5 questions to find your Disney Princess match!</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <div className="text-sm text-muted-foreground mb-2">
              Question {currentQuestion + 1} of {quizQuestions.length}
            </div>
            <h2 className="text-xl font-semibold mb-4">{question.question}</h2>
            <div className="space-y-3">
              {question.options.map((option, index) => (
                <Button
                  key={index}
                  variant={selectedAnswer === option.value ? "default" : "outline"}
                  className="w-full justify-start text-left"
                  onClick={() => handleAnswer(option.value)}
                >
                  {option.text}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button 
            variant="outline" 
            onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
            disabled={currentQuestion === 0}
          >
            Previous
          </Button>
          <Button 
            onClick={handleNext} 
            disabled={!selectedAnswer}
          >
            {currentQuestion === quizQuestions.length - 1 ? "See Result" : "Next"}
          </Button>
        </CardFooter>
      </Card>
    </main>
  );
}
