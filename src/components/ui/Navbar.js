'use client';
import React, { useState, useRef } from 'react';
import Link from 'next/link';
import SubMenu from './SubMenu';
import HamburgerButton from './HamburgerButton';
import HamburgerMenu from './HamburgerMenu';
import { ProductsContext } from '@/lib/context/ProductProvider';
import { FaSearch, FaUser, FaShoppingCart } from 'react-icons/fa';

const NavBar = () => {
  const { products } = React.useContext(ProductsContext);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [hoveredLink, setHoveredLink] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

  const handleToggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (

    <div className='h-20 bg-gray-600 text-white sticky top-0 z-10'>
      <div className='relative w-full h-full flex justify-center items-center px-4 md:px-10'>

        {/* Left section */}
        <div className='flex items-center absolute left-0 ml-8'>
          <Link href="/">HOME</Link>
        </div>

        {/* Center section */}
        <div className="hidden md:flex flex-row gap-4 justify-center items-center">
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

        {/* Right section */}
        <div className="flex flex-row gap-4 items-center absolute right-0 mr-8">
          <FaSearch className="md:block" />
          <HamburgerButton className='' onClick={handleToggleMenu} />
          <FaUser className="hidden md:block" />
          <FaShoppingCart className="md:block" />
        </div>

        {isMenuOpen && <HamburgerMenu isOpen={isMenuOpen} onClose={handleToggleMenu} /> }

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
}

export default NavBar;
