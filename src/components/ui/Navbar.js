'use client';
import React, { useState, useRef } from 'react';
import Link from 'next/link';
import SubMenu from './SubMenu';
import { ProductsContext } from '@/lib/context/ProductProvider';

const NavBar = () => {
  const { products } = React.useContext(ProductsContext);
  const [hoveredLink, setHoveredLink] = useState(null);
  const leaveTimeoutRef = useRef(null);

  const handleMouseEnterLink = (link) => {
    if (leaveTimeoutRef.current) clearTimeout(leaveTimeoutRef.current);
    setHoveredLink(link);
  };

  const handleMouseLeaveLink = () => {
    leaveTimeoutRef.current = setTimeout(() => {
      setHoveredLink(null);
    }, 100);
  };

  if (hoveredLink) {
    console.log(hoveredLink.split('/')[2]);
    const filteredProducts = products.filter((product) => {
      console.log(product.metadata.category)
      return product.metadata.category === hoveredLink.split('/')[2];
    });
    console.log(filteredProducts);
  }



  return (
    <div
      className='w-full flex flex-row gap-4 justify-center items-center h-24 bg-gray-600 text-white sticky top-0 z-10'
    >
      <Link href="/">HOME</Link>
      <div
        onMouseEnter={() => handleMouseEnterLink('/products/supplements')}
        onMouseLeave={handleMouseLeaveLink}
      >
        <Link href="/products/supplements">SUPPLEMENTS</Link>
      </div>
      <div
        onMouseEnter={() => handleMouseEnterLink('/products/merch')}
        onMouseLeave={handleMouseLeaveLink}
      >
        <Link href="/products/merch">MERCH</Link>
      </div>
      <div
        onMouseEnter={() => handleMouseEnterLink('/products/accessories')}
        onMouseLeave={handleMouseLeaveLink}
      >
        <Link href="/products/accessories">ACCESSORIES</Link>
      </div>
      <div
        onMouseEnter={() => handleMouseEnterLink('/products/newreleases')}
        onMouseLeave={handleMouseLeaveLink}
      >
        <Link href="/products/newreleases">NEW RELEASES</Link>
      </div>

      {hoveredLink && (
        <SubMenu
          onMouseEnter={() => {
            if (leaveTimeoutRef.current) clearTimeout(leaveTimeoutRef.current);
          }}
          onMouseLeave={() => {
            setHoveredLink(null);
          }}
        />
      )}
    </div>
  );
};

export default NavBar;
