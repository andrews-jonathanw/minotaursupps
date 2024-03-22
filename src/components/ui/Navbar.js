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

  const menuItems = {
    '/products/supplements': [
      { title: 'supplements 1', href: '/products/supplements/subitem1' },
      { title: 'supplements 2', href: '/products/supplements/subitem2' }
    ],
    '/products/merch': [
      { title: 'merch 1', href: '/products/merch/subitem1' },
      { title: 'merch 2', href: '/products/merch/subitem2' }
    ],
    '/products/accessories': [
      { title: 'accessories 1', href: '/products/accessories/subitem1' },
      { title: 'accessories 2', href: '/products/accessories/subitem2' }
    ],
    '/products/newreleases': [
      { title: 'newreleases 1', href: '/products/newreleases/subitem1' },
      { title: 'newreleases 2', href: '/products/newreleases/subitem2' }
    ]
  };


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
          items={menuItems[hoveredLink]}
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
