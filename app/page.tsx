"use client";

import Link from "next/link";

export default function Home() {
  return (
    <section>
      <h1 className="text-xl font-bold mb-4">Wybierz rodzaj produktu</h1>
      <div className="flex gap-4">
        <Link
          href="/products/wardrobes" 
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Zobacz Szafy
        </Link>

        <Link 
          href="/products/beds" 
          className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
        >
          Zobacz Łóżka
        </Link>

        <Link 
          href="/features/quiz" 
          className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-green-700 transition"
        >
          Quiz
        </Link>
      </div>
    </section>
  );
}
