"use client";

import { useState } from "react";
import bedsData from "./beds.json";
import ProductItem from "@/app/components/product-item";
import Link from "next/link";

export default function BedsPage() {
  const [activeBed, setActiveBed] = useState(() => {
    const randomIndex = Math.floor(Math.random() * bedsData.length);
    return bedsData[randomIndex];
  });

  const chooseBed = () => {
    if (bedsData.length <= 1) return;

    let nextBed;
    do {
      const randomIndex = Math.floor(Math.random() * bedsData.length);
      nextBed = bedsData[randomIndex];
    } while (nextBed.id === activeBed.id);

    setActiveBed(nextBed);
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-50">
      <ProductItem key={activeBed.id} product={activeBed} />

      <button
        onClick={chooseBed}
        className="mt-8 px-8 py-3 bg-indigo-600 text-white font-medium rounded-full hover:bg-indigo-700 transition-transform active:scale-95 shadow-md"
      >
        Nastepne lozko
      </button>

      <Link
        href="/"
        className="mt-10 px-6 py-3 bg-white text-gray-800 border-2 border-gray-800 font-semibold rounded-full hover:bg-gray-800 hover:text-white transition-all duration-300 ease-in-out flex items-center gap-2"
      >
        <span>←</span> Powrót na główną
      </Link>
    </main>
  );
}
