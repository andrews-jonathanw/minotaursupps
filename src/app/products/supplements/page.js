'use client';
import React, { useState } from 'react';
import { ProductsContext } from '@/lib/context/ProductProvider';
import ProductTile from '@/components/products/ProductTile';

const SupplementTypes = [
  { name: 'Performance', type: 'performance' },
  { name: 'Recovery', type: 'recovery' },
  { name: 'Protein', type: 'protein' },
  { name: 'Shop By Goal', type: ['weightgain', 'weightloss', 'musclebuilding'] },
];

export default function Page() {
  const { products } = React.useContext(ProductsContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState(null);

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
    (!selectedType ||
      (Array.isArray(selectedType) ?
        selectedType.includes(product.metadata.type) :
        product.metadata.type === selectedType)
    )
  );

  const handleSearchChange = event => {
    setSearchQuery(event.target.value);
  };

  const handleTypeClick = (type) => {
    if (selectedType === type) {
      setSelectedType(null);
      return;
    }
    setSelectedType(type);
  };

  return (
    <div className='flex flex-col justify-center items-center h-full pt-10'>
      {/* Search Bar Removed for now */}
      {/* <div className='w-full max-w-md mt-4 mb-2'>
        <input
          type='text'
          placeholder='Search products...'
          className='w-full bg-gray-100 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-gray-800'
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div> */}

      {/* Supplement Type Buttons */}
      <div className='flex flex-wrap gap-2 md:gap-4 mb-4'>
          {SupplementTypes.map((type, index) => (
            <button
            key={index}
            className={`py-2 px-4 rounded-lg cursor-pointer ${selectedType === type.type ? 'bg-gray-800 text-white' : 'bg-gray-200 text-gray-800'}`}
            onClick={() => handleTypeClick(type.type)}
            >
              {type.name}
            </button>
          ))}
        </div>
          <p className='text-white text-center text-md mx-10 mt-5'>Unleash your potential and conquer your fitness goals with Minotaur Supps, offering premium pre-workout, intra-workout, protein, and amino acid supplements for elevated training experiences.</p>

      {/* Product Grid */}
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-4 m-8'>
        {filteredProducts.map((product, index) => (
          <ProductTile key={index} product={product} />
        ))}
      </div>
    </div>
  );
}
