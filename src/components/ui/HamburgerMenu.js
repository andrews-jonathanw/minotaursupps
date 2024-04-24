import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import HamburgerItem from './HamburgerItem';

const HamburgerMenu = ({ isOpen, onClose }) => {

  const menuLinks = [
    { name: 'SUPPLEMENTS', url: '/products/supplements' },
    { name: 'MERCH', url: '/products/merch' },
    { name: 'ACCESSORIES', url: '/products/accessories' },
    { name: 'NEW RELEASES', url: '/products/newreleases' },
    { name: 'BLOG', url: '/blog' }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="absolute top-0 right-0 bg-black w-2/4 z-50"
          initial={{ x: '100%', height: '100vh' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        >
          <div className="text-end m-4 cursor-pointer" onClick={onClose}>X</div>
          <div className="flex flex-col">
            {menuLinks.map((link, index) => (
              <HamburgerItem key={index} link={link} />
            ))}

          </div>

        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default HamburgerMenu;
