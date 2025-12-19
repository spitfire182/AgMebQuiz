"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

import { Product } from "../../components/product-item";

import bedsData from "../../products/beds/beds.json";
import wardrobesData from "../../products/wardrobes/wardrobes.json";

interface QuizProduct extends Product {
  item_type: "bed" | "wardrobe";
}

const getAllProducts = (): QuizProduct[] => {
  return [
    ...bedsData.map((item) => ({ ...item, item_type: "bed" as const })),
    ...wardrobesData.map((item) => ({
      ...item,
      item_type: "wardrobe" as const,
    })),
  ];
};

export const getRandomProduct = (allProducts: QuizProduct[]): QuizProduct => {
  const randomIndex = Math.floor(Math.random() * allProducts.length);
  return allProducts[randomIndex];
};

export default function QuizPage() {
  const allProducts = getAllProducts();

  const generateQuestion = (product: QuizProduct) => {
    const properties = ["manufacturer", "code", "wait_time", "additional_info"];
    const randomProp =
      properties[Math.floor(Math.random() * properties.length)];
    const correctAnswer = String(product[randomProp as keyof typeof product]);

    const wrongAnswers = allProducts
      .filter((p) => p.id !== product.id)
      .map((p) => String(p[randomProp as keyof typeof p]))
      .filter(
        (val, index, self) =>
          val !== correctAnswer && self.indexOf(val) === index
      )
      .sort(() => Math.random() - 0.5)
      .slice(0, 2);

    const options = [correctAnswer, ...wrongAnswers].sort(
      () => Math.random() - 0.5
    );

    return {
      activeItem: product,
      options,
      correctValue: correctAnswer,
      propertyName: randomProp,
    };
  };

  const [quizState, setQuizState] = useState(() =>
    generateQuestion(getRandomProduct(allProducts))
  );
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  const { activeItem, options, correctValue, propertyName } = quizState;

  const handleNext = () => {
    setSelectedAnswer(null);
    const nextProduct =
      allProducts[Math.floor(Math.random() * allProducts.length)];
    setQuizState(generateQuestion(nextProduct));
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-50">
      <div className="max-w-md mx-auto p-6 bg-white rounded-2xl shadow-xl border mt-10">
        <h2 className="text-xl font-bold mb-4 text-center">
          Zgadnij parametr produktu
        </h2>

        <div className="relative h-48 w-full mb-4">
          <Image
            src={activeItem.image}
            alt={activeItem.name}
            fill
            className="object-contain rounded-lg"
          />
        </div>

        <h3 className="text-lg font-semibold text-center mb-2">
          {activeItem.name}
        </h3>
        <p className="text-sm text-gray-500 text-center mb-6 uppercase tracking-wider">
          Kategoria: {propertyName.replace("_", " ")}
        </p>

        <div className="space-y-3">
          {options.map((option, idx) => (
            <p
              key={idx}
              onClick={() => !selectedAnswer && setSelectedAnswer(option)}
              className={`p-4 border-2 rounded-xl cursor-pointer transition-all ${
                selectedAnswer === option
                  ? option === correctValue
                    ? "border-green-500 bg-green-50"
                    : "border-red-500 bg-red-50"
                  : "border-gray-100 hover:border-indigo-300"
              } ${
                selectedAnswer && option === correctValue
                  ? "border-green-500 bg-green-50"
                  : ""
              }`}
            >
              {option}
            </p>
          ))}
        </div>

        {selectedAnswer && (
          <div className="mt-6 text-center animate-in fade-in zoom-in duration-300">
            <p
              className={`font-bold ${
                selectedAnswer === correctValue
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {selectedAnswer === correctValue
                ? "Brawo! Poprawna odpowiedź ✨"
                : "Niestety, to nie to ❌"}
            </p>
            <button
              onClick={handleNext}
              className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-full"
            >
              Następne pytanie
            </button>
          </div>
        )}
      </div>

      <Link
        href="/"
        className="mt-10 px-6 py-3 bg-white text-gray-800 border-2 border-gray-800 font-semibold rounded-full hover:bg-gray-800 hover:text-white transition-all duration-300 ease-in-out flex items-center gap-2"
      >
        <span>←</span> Powrót na główną
      </Link>
    </main>
  );
}
