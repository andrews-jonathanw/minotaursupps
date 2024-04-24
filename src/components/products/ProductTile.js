import React from 'react';
import { motion } from 'framer-motion';

export default function ProductTile({ product }) {

  const navigateToProductPage = () => {
    window.location.href = `/products/${product.metadata.category}/${product.name}`;
  }

  return (
    <motion.div
      className='flex flex-col items-center justify-center w-64 h-auto p-4 gap-8 cursor-pointer'
      onClick={navigateToProductPage}
      whileHover={{ scale: 1.05, transition: { duration: 0.8 } }}
    >
      <motion.img
        src={'/assets/supplementImages/23336.jpg'}
        alt={product.name}
        className='w-64 h-64 object-cover'
        transition={{ duration: .6 }}
      />
      <div className='text-center'>
        <p className='text-sm font-semibold mb-1 text-white'>{product.name}</p>
        <p className='text-sm text-white'>Price: ${product.prices[0].unit_amount / 100}</p>
      </div>
    </motion.div>
  );
}
