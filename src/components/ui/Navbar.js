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
    <div className='h-20 bg-gray-600 text-white sticky top-0 z-10'>
      <div className='relative w-full h-full flex justify-between items-center px-10 gap-2'>

        <div className='flex items-center'>
          <Link href="/">
            HOME
          </Link>
        </div>


        <div className="absolute translate-x-[-50%] left-[50%] hidden md:flex flex-row gap-4 justify-center items-center">
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
            <Link href="/blog" className='text-nowrap'>BLOG</Link>
        </div>

        <div className="flex flex-row gap-4">
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
