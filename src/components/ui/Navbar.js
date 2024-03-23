'use client';
import React, { useState, useRef } from 'react';
import Link from 'next/link';
import SubMenu from './SubMenu';
import HamburgerMenu from './HamburgerMenu';
import { ProductsContext } from '@/lib/context/ProductProvider';

const NavBar = () => {
  const { products } = React.useContext(ProductsContext);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [hoveredLink, setHoveredLink] = useState(null);
  const leaveTimeoutRef = useRef(null);

  const handleMouseEnterLink = (link) => {
    if (leaveTimeoutRef.current) clearTimeout(leaveTimeoutRef.current);
    setHoveredLink(link);
    const category = link.split('/')[2];
    const filtered = products.filter(product => product.metadata.category === category);
    setFilteredProducts(filtered);
  };

  const handleMouseLeaveLink = () => {
    leaveTimeoutRef.current = setTimeout(() => {
      setHoveredLink(null);
    }, 100);
  };

  const handleHamburgerClick = () => {
  };

  return (
    <div className='w-full h-20 bg-gray-600 text-white sticky top-0 z-10'>
      <div className='relative w-full h-full flex flex-row items-center justify-center'>

        <div className='absolute left-0 px-4'>
          <Link href="/">
            HOME
          </Link>
        </div>


        <div className="hidden md:flex flex-row gap-4 justify-between items-center">
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
            <Link href="/products/newreleases" className='text-nowrap'>NEW RELEASES</Link>
          </div>
        </div>

        <div className="absolute right-0 px-4 flex gap-4">
          <HamburgerMenu onClick={handleHamburgerClick} />
          <button className="hidden md:block">Search</button>
          <button className="hidden md:block">Account</button>
          <button className="hidden md:block">Cart</button>
        </div>

        {hoveredLink && (
          <SubMenu
            menuItems={filteredProducts}
            onMouseEnter={() => {
              if (leaveTimeoutRef.current) clearTimeout(leaveTimeoutRef.current);
            }}
            onMouseLeave={() => {
              setHoveredLink(null);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default NavBar;
