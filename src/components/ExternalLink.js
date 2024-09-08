import React from 'react';
import { NavLink } from 'react-router-dom';

const ExternalLink = ({ to, children, className }) => {
  const handleClick = () => {
    window.location.href = to;
  };

  return (
    <div className={className} onClick={handleClick}>
      {children}
    </div>
  );
};
