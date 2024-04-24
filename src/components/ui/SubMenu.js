import React from 'react';
import Link from 'next/link';

const SubMenu = ({ menuItems, onMouseEnter, onMouseLeave }) => {
  const groupedProducts = menuItems.reduce((acc, product) => {
    const type = product.metadata.type;
    if (!acc[type]) {
      acc[type] = [];
    }
    acc[type].push(product);
    return acc;
  }, {});

  return (
    <div
      className="absolute bg-black shadow-md rounded-md py-2 px-3 w-full flex flex-row justify-between gap-4"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{ top: 'calc(65%)', left: '50%', transform: 'translateX(-50%)', zIndex: 10 }}
    >
      {Object.keys(groupedProducts).map(type => (
        <div key={type} className=''>
          <h3 className="text-white text-lg font-bold mb-2">{type.toUpperCase()}</h3>
          <ul>
            {groupedProducts[type].map(product => (
              <li key={product.id}>
                <Link href={`/products/${product.metadata.category}/${product.name}`} className='inline-block hover:underline hover:text-blue-300 transition duration-300'>
                  {product.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default SubMenu;
