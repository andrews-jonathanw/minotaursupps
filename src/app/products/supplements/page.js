'use client';
import React from 'react'
import { ProductsContext } from '@/lib/context/ProductProvider';

export default function page() {
  const { products } = React.useContext(ProductsContext);
  console.log(products)

  return (
    <div className='flex flex-row gap-2 items-center justify-center text-white'>
      {products.map((product, index) => (
        <div key={index} className='flex flex-col items-center justify-center'>
          <img src={product.metadata.img} alt={product.metadata.name} />
          <p>{product.name}</p>
          <p>{product.prices[0].unit_amount}</p>
        </div>
      ))}
    </div>
  )
}
