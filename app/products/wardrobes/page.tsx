"use client";

import { useState } from "react";
import wardrobesData from "./wardrobes.json";
import ProductItem from "@/app/components/product-item";
import Link from "next/link";

export default function WardrobesPage() {
  const [activeWardrobe, setActiveWardrobe] = useState(() => {
    const randomIndex = Math.floor(Math.random() * wardrobesData.length);
    return wardrobesData[randomIndex];
  });

  const chooseBed = () => {
    if (wardrobesData.length <= 1) return;

    let nextWardrobe;
    do {
      const randomIndex = Math.floor(Math.random() * wardrobesData.length);
      nextWardrobe = wardrobesData[randomIndex];
    } while (nextWardrobe.id === activeWardrobe.id);

    setActiveWardrobe(nextWardrobe);
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-50">
      <ProductItem key={activeWardrobe.id} product={activeWardrobe} />

      <button
        onClick={chooseBed}
        className="mt-8 px-8 py-3 bg-indigo-600 text-white font-medium rounded-full hover:bg-indigo-700 transition-transform active:scale-95 shadow-md"
      >
        Nastepna szafa
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
