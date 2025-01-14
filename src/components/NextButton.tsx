import React from 'react';
import arrowIcon from '../assets/arrow.png';

interface NextButtonProps {
  onClick: () => void;
}

const NextButton: React.FC<NextButtonProps> = ({ onClick }) => {
  return (
    <button 
      onClick={onClick} 
      style={{ 
        position: 'absolute', 
        bottom: '0%', 
        right: '2%',
        background: `url(${arrowIcon}) no-repeat center`,
        backgroundSize: 'contain',
        width: '70px',
        height: '70px',
        border: 'none',
        cursor: 'pointer'
      }}
    >
      <span className="sr-only"></span>
    </button>
  );
};

export default NextButton;
