import { useState } from 'react';


const LandingPage = () => {

  const [isGameStarted, setIsGameStarted] = useState(false);
    const startGame = () => {
      console.log(isGameStarted)
        setIsGameStarted(true);
      };
    
  return (
    <button onClick={startGame} className="play-button">
    Play
  </button>
  );
};

export default LandingPage;
