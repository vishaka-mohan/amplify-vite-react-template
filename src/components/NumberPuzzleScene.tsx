import React, { useState } from 'react';
import DialogueBox from './DialogueBox';
import Character from './Character';
import NarratorImage from '../assets/narrator.png'

interface NumberPuzzleSceneProps {
  onNext: () => void;
}

const NumberPuzzleScene: React.FC<NumberPuzzleSceneProps> = ({ onNext }) => {
  const [inputs, setInputs] = useState<string[]>(['', '', '', '']);
  const [isCorrect, setIsCorrect] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [narratorDialogue, setNarratorDialogue] = useState('Solve the puzzle using the clue provided to proceed.');

  const correctAnswer = ['1', '1', '2', '3'];
  var character1 = {
    id: 'Narrator',
    name: 'NARRATOR',
    image: NarratorImage,
    position: { x: 10, y: 250 },
    isLeftSide: true,
  }
  const handleInputChange = (value: string, index: number) => {
    const newInputs = [...inputs];
    newInputs[index] = value.replace(/[^0-9]/g, ''); // Allow only digits
    setInputs(newInputs);
  };

  const verifyAnswer = () => {
    if (inputs.join('') === correctAnswer.join('')) {
      setIsCorrect(true);
      setErrorMessage('You honor the Frost Spirit well. The sacred number is yours to keep.');
      setNarratorDialogue('You honor the Frost Spirit well. The sacred number is yours to keep.');

    } else {
      //alert('Incorrect! Please try again.');
      setIsCorrect(false);
      setErrorMessage('Incorrect! Please try again.');
      setNarratorDialogue('Uh Oh! Please try again.');
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
      {isCorrect ? (
        <>
        <p></p>
        <button onClick={onNext} className="next-button">
          Next
        </button>

        <div  style={{ backgroundSize: 'cover', backgroundPosition: 'center', height: '100vh', width: '100vw'}}>
      <Character character={character1} />
      <DialogueBox character= {character1}          
            dialogue={narratorDialogue}
      />
      </div>
        </>
      ) : (
        <div style={{ backgroundSize: 'cover', backgroundPosition: 'center', height: '100vh', width: '100vw'}}>
          <Character character={character1} />
          <DialogueBox character={character1}
            dialogue={narratorDialogue}
          />
        </div>
      )}


       
        

    </div>
  );
};

export default NumberPuzzleScene;
