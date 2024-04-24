import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import HamburgerItem from './HamburgerItem';

const HamburgerMenu = ({ isOpen, onClose }) => {
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
            <HamburgerItem />
            {/* <a href="/products/supplements">SUPPLEMENTS</a>
            <a href="/products/merch">MERCH</a>
            <a href="/products/accessories">ACCESSORIES</a>
            <a href="/products/newreleases">NEW RELEASES</a>
            <a href="/blog">BLOG</a> */}
          </div>

        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default HamburgerMenu;
