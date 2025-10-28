"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface Product {
  id: number;
  category?: string;
  title?: string;
  description?: string;
  price?: number;
  image?: Array<{
    id: number;
    url: string;
    alternativeText?: string;
  }>;
}

export default function ProductViewer() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch(
          "http://localhost:1337/api/products?populate=*"
        );
        const data = await res.json();
        setProducts(data.data || []);
      } catch (err) {
        console.error("Failed to fetch products:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  if (loading) return <p>Loading products...</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4 font-sans">
      {products.map((product) => {
        if (!product) return null;
        const firstImage = product.image?.[0];
        const imageUrl = firstImage?.url
          ? firstImage.url.startsWith("http")
            ? firstImage.url
            : `http://localhost:1337${firstImage.url}`
          : null;
        const altText = firstImage?.alternativeText ?? "Product Image";

        return (
          <div
            key={product.id}
            className="border rounded p-4 shadow hover:shadow-lg transition"
          >
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt={altText}
                width={400}
                height={300}
                className="w-full h-48 object-cover rounded mb-2"
                unoptimized // <-- add this
                loading="eager"
              />
            ) : (
              <div className="w-full h-48 bg-gray-200 rounded mb-2 flex items-center justify-center text-gray-500">
                No Image
              </div>
            )}
            <h2 className="text-lg ">{product.title || "Untitled"}</h2>
            <p className="text-gray-600">{product.description}</p>
            <p className="mt-2 ">{product.price ? `$${product.price}` : ""}</p>
          </div>
        );
      })}
    </div>
  );
}
