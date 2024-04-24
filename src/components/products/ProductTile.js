import React from 'react';

export default function ProductTile({ product }) {
  return (
    <div className='flex flex-col items-center justify-center w-64 h-auto p-4 gap-8'>
      <img src={product.metadata.img} alt={product.metadata.name} className='w-64 h-64 object-cover' />
      <div className='text-center'>
        <p className='text-sm font-semibold mb-1 text-white'>{product.name}</p>
        <p className='text-sm  text-white'>Price: ${product.prices[0].unit_amount / 100}</p>
      </div>
    </div>
  );
}
