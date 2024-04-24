import React, { useState } from 'react';
import Link from 'next/link';

const SubMenu = ({ menuItems, onMouseEnter, onMouseLeave }) => {
  const [activeType, setActiveType] = useState(null);

  const handleMouseEnter = (type) => {
    setActiveType(type);
    onMouseEnter();
  };

  const handleMouseLeave = () => {
    setActiveType(null);
    onMouseLeave();
  };

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
      className="absolute bg-black shadow-md rounded-md py-2 px-3 w-full flex flex-row justify-center gap-10 mx-auto"
      onMouseLeave={handleMouseLeave}
      style={{ top: 'calc(65%)', left: '50%', transform: 'translateX(-50%)', zIndex: 10 }}
    >
      {Object.keys(groupedProducts).map(type => (
        <div
          key={type}
          className={`relative text-white}`}
          onMouseEnter={() => handleMouseEnter(type)}
          style={{ filter: activeType && activeType !== type ? 'brightness(50%)' : 'none' }}
        >
          <h3 className="text-lg font-bold mb-2">{type.toUpperCase()}</h3>
          <ul>
            {groupedProducts[type].map(product => (
              <li key={product.id}>
                <Link href={`/products/${product.metadata.category}/${product.name}`} passHref>
                  <div className='inline-block hover:underline transition duration-300 relative'>
                    {product.name}
                    {activeType === type && (
                      <span
                        className="absolute h-0.5 bg-blue-300 left-0 bottom-0 transition-transform"
                        style={{ width: '100%', transform: 'scaleX(0)', transition: 'transform 0.3s ease-in-out' }}
                      />
                    )}
                  </div>
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
