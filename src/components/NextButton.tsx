import React from 'react';

interface NextButtonProps {
  onClick: () => void;
}

const NextButton: React.FC<NextButtonProps> = ({ onClick }) => {
  return (
    <button onClick={onClick} style={{ position: 'absolute', bottom: '0%', right: '2%' }}>
      Next
    </button>
  );
};

export default NextButton;
