'use client';
import React, { useState } from 'react';
import { ProductsContext } from '@/lib/context/ProductProvider';
import ProductTile from '@/components/products/ProductTile';

export default function Page() {
  const { products } = React.useContext(ProductsContext);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearchChange = event => {
    setSearchQuery(event.target.value);
  };

  return (
    <div className='flex flex-col justify-center items-center h-full'>
      <div className='w-full max-w-md mt-4 mb-2'>
        <input
          type='text'
          placeholder='Search products...'
          className='w-full bg-gray-100 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-gray-800'
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-4'>
        {filteredProducts.map((product, index) => (
          <ProductTile key={index} product={product} />
        ))}
      </div>
    </div>
  );
}
