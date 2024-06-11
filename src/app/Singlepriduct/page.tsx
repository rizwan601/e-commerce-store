  "use client"
import React, { useState } from 'react';

const SingleProduct: React.FC = () => {
  const [productId, setProductId] = useState<number | null>(null);
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const fetchProduct  = () => {
    setLoading(true);
    setErrorMessage('');

    if (productId) {
      fetch(`https://fakestoreapi.com/products/${productId}`)
        .then(res => {  
          if (res.ok) {
            return res.json();
          } else {
            throw new Error('Product not available');
          }
        })
        .then(json => {
          setProduct(json);
          setLoading(false);  
        })
        .catch(error => {
          console.error('Error fetching product:', error);
          setErrorMessage('Product not available');
          setLoading(false);
        });
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Single Product</h1>
      <div className="flex items-center mb-4">
        <input
          type="number"
          placeholder="Enter Product ID"
          className="border rounded-l px-4 py-2 focus:outline-none focus:ring focus:border-blue-300"
          value={productId || ''}
          onChange={e => setProductId(parseInt(e.target.value))}
        />
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-r focus:outline-none focus:ring focus:border-blue-300"
          onClick={fetchProduct}
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Fetch Product'}
        </button>
      </div>
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      {product && (
        <div className="border rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-2">{product.title}</h2>
          <img src={product.image} alt={product.title} className="w-full h-48 object-contain mb-4" />
          <p className="text-lg font-bold text-green-500 mb-2">${product.price}</p>
          <p className="text-sm text-gray-700 mb-4">{product.description}</p>
          <div className="text-yellow-500 mb-2">
            {Array(Math.round(product.rating.rate)).fill('★').join('')}
            {Array(5 - Math.round(product.rating.rate)).fill('☆').join('')}
          </div>
          <p className="text-sm text-gray-600">{product.rating.count} reviews</p>
        </div>
      )}
    </div>
  );
};

export default SingleProduct;
