import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { motion } from 'framer-motion';

export default function HamburgerItem( { link } ) {
  const [firstOpen, setFirstOpen] = useState(true);
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);

  const toggleDropDown = () => {
    setFirstOpen(false);
    setIsDropDownOpen(!isDropDownOpen);
  };

  return (
    <div className='flex flex-col gap-2'>
      <div className="border-t border-gray-400"></div>
      <div className='flex flex-row relative'>
        <div className='ml-6 mt-1'>{link.name}</div>
        <div className='absolute right-0 mr-10 border-l border-gray-400 h-7 mx-2 mt-1'></div>
        <motion.button
          onClick={toggleDropDown}
          className='focus:outline-none absolute right-0 mr-3 mt-2'
          initial={false}
          animate={{ rotate: isDropDownOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <FaChevronDown/>
        </motion.button>
      </div>
      <motion.div
        className="flex flex-col ml-6"
        initial={false}
        animate={{ height: isDropDownOpen ? "auto" : 0 }}
        transition={{ duration: isDropDownOpen ? 0.3 : 0.6 }}
      >
        {isDropDownOpen && (
          <>
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div>Product 1</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <div>Product 2</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <div>Product 3</div>
            </motion.div>
          </>
        )}

        {!isDropDownOpen && !firstOpen && (
          <>
            <motion.div
              initial={{ opacity: 1, y: 0 }}
              animate={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, delay: 0.2}}
            >
              <div>Product 1</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 1, y: 0 }}
              animate={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2, delay: 0.1 }}
            >
              <div>Product 2</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 1, y: 0 }}
              animate={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.1 }}
            >
              <div>Product 3</div>
            </motion.div>
          </>
        )}
      </motion.div>
      <div className="border-b border-gray-400"></div>
    </div>
  );
}
