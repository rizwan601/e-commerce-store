"use client";

import React, { useEffect, useState } from 'react';

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

const AllProducts: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then((json: Product[]) => {
        setProducts(json);
        setLoading(false);
      })
      .catch((error: Error) => {
        console.error('Error fetching products:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">
    <div className="text-center text-2xl text-green-500 font-bold">
      Loading...
    </div>
  </div>
  }

  return (
    <div className="container mx-auto p-10 pt-[100px] ">
      <h1 className="text-3xl font-bold mb-6 text-center text-green-500">All Products</h1>
      <div className="flex flex-wrap -mx-4">
        {products.map((product: Product) => (
          <div key={product.id} className="w-full sm:w-1/2 lg:w-1/4 p-4 flex">
            <div className="border rounded-lg p-4 flex flex-col items-center flex-grow">
              <img src={product.image} alt={product.title} className="w-full h-48 object-contain mb-4" />
              <h2 className="text-xl font-semibold mb-2">{product.title}</h2>
              <p className="text-lg font-bold text-green-500 mb-2">${product.price}</p>
              <p className="text-sm text-gray-700 mb-4">{product.description}</p>
              <div className="text-yellow-500 mb-2">
                {Array(Math.round(product.rating.rate)).fill('★').join('')}
                {Array(5 - Math.round(product.rating.rate)).fill('☆').join('')}
              </div>
              <p className="text-sm text-gray-600">{product.rating.count} reviews</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AllProducts;
