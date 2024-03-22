import React from 'react';
import Link from 'next/link';

const SubMenu = ({onMouseEnter, onMouseLeave }) => {
  return (
    <div
      className="absolute bg-gray-900 shadow-md rounded-md py-2 px-3 mt-20 w-3/4"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div>
        <ul className='flex flex-row gap-2 justify-evenly items-center'>
        </ul>
      </div>
    </div>
  );
};

export default SubMenu;
