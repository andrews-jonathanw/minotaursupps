import React from 'react';
import Link from 'next/link';

const SubMenu = ({ items, onMouseEnter, onMouseLeave }) => {
  return (
    <div
      className="absolute bg-gray-900 shadow-md rounded-md py-2 px-3 mt-20 w-3/4"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div>
        <ul className='flex flex-row gap-2 justify-evenly items-center'>
          {items && items.map((item, index) => (
            <li key={index}>
              <Link href={item.href}>
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SubMenu;
