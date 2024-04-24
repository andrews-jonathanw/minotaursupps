import React from 'react';

const HamburgerButton = ({ onClick }) => {
  return (
    <div className="hamburger-button md:hidden visible" onClick={onClick}>
      <div className="line"></div>
      <div className="line"></div>
      <div className="line"></div>
    </div>
  );
};

export default HamburgerButton;
