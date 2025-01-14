import React, { useState } from 'react';

interface NumberPuzzleSceneProps {
  onNext: () => void;
}

const NumberPuzzleScene: React.FC<NumberPuzzleSceneProps> = ({ onNext }) => {
  const [inputs, setInputs] = useState<string[]>(['', '', '', '']);
  const [isCorrect, setIsCorrect] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const correctAnswer = ['1', '1', '2', '3'];

  const handleInputChange = (value: string, index: number) => {
    const newInputs = [...inputs];
    newInputs[index] = value.replace(/[^0-9]/g, ''); // Allow only digits
    setInputs(newInputs);
  };

  const verifyAnswer = () => {
    if (inputs.join('') === correctAnswer.join('')) {
      setIsCorrect(true);
      setErrorMessage('You honor the Frost Spirit well. The sacred number is yours to keep.');
    } else {
      //alert('Incorrect! Please try again.');
      setIsCorrect(false);
      setErrorMessage('Incorrect! Please try again.');
    }
  };

  return (
    <div className="number-puzzle-scene" style={{color: 'white'}}>
      <h2>Solve the Puzzle</h2>
      <p>{errorMessage}</p>
      <div className="input-container">
        {inputs.map((input, index) => (
          <input
            key={index}
            type="text"
            maxLength={1}
            value={input}
            onChange={(e) => handleInputChange(e.target.value, index)}
            className="fibonacci-input"
          />
        ))}
      </div>
      <button onClick={verifyAnswer} className="verify-button">
        Verify
      </button>
      {isCorrect && (
        <button onClick={onNext} className="next-button">
          Next
        </button>
      )}
    </div>
  );
};

export default NumberPuzzleScene;
