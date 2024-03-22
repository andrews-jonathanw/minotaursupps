'use client';
import React, { createContext, useState, useEffect } from 'react';
import fetchProducts from '../utils/fireStoreUtils';

export const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductsData = async () => {
      const fetchedProducts = await fetchProducts();
      setProducts(fetchedProducts);
      setLoading(false);
    };

    fetchProductsData();
  }, []);

  if (loading) {
    return <div className='text-white'>Loading...</div>;
  }

  return (
    <ProductsContext.Provider value={{ products, loading }}>
      {children}
    </ProductsContext.Provider>
  );
};
