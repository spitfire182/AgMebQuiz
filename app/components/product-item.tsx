'use client';

import { useState } from "react";
import Image from "next/image";

export interface Product {
  id: number;
  name: string;
  size: string[];
  image: string;
  manufacturer: string;
  code: string;
  wait_time: string;
  additional_info?: string;
}

export default function ProductItem({ product }: { product: Product }) {
    const [size, setSize] = useState(false);
    const [manufacturer, setManufacturer] = useState(false);
    const [additInfo, setAdditInfo] = useState(false);
  return (
    <div className="border rounded-xl p-6 shadow-lg max-w-md bg-white">
      <div className="relative h-64 w-full mb-4">
        <Image
          src={product.image}
          alt={product.name}
          width={250}
          height={450}
          className="object-cover rounded-md"
        />
      </div>
      <h2 className="text-2xl font-semibold">{product.name}</h2>
      <p onClick={() => setSize(!size)}>Wymiary: {size ? product.size.join(", ") : "<SPRAWDZ>"}</p>
      <p onClick={() => setManufacturer(!manufacturer)}>
        Producent: {manufacturer ?`${product.manufacturer} - ${product.code}` :"<SPRAWDZ>"}
      </p>
      {product.additional_info && (
        <p onClick={() => setAdditInfo(!additInfo)}>
          Dodatkowe informacje: {additInfo ? product.additional_info : "<SPRAWDZ>"}
        </p>
      )}
    </div>
  );
}
