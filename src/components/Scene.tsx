import React, { useEffect, useState } from 'react';
import { Scene } from '../models/SceneModel';
import DialogueBox from './DialogueBox';
import NextButton from './NextButton';
import Character from './Character';

interface SceneProps {
  scenes: Scene[];
}

const SceneComponent: React.FC<SceneProps> = ({ scenes }) => {
  const [currentSceneIndex, setCurrentSceneIndex] = useState(0);
  const [currentDialogueIndex, setCurrentDialogueIndex] = useState(0);
  const [fadeClass, setFadeClass] = useState('fade-in');
  const [showCharacters, setShowCharacters] = useState(false);
  

  const currentScene = scenes[currentSceneIndex];
  const { backgroundImage, characters, dialogues } = currentScene;

  const isLastDialogue = currentDialogueIndex === dialogues.length - 1;
  const isLastScene = currentSceneIndex === scenes.length - 1;

  const handleNext = () => {
    if (!isLastDialogue) {
      // Show next dialogue in the current scene
      setCurrentDialogueIndex((prev) => prev + 1);
    } else if (!isLastScene) {
      // Trigger fade-out before changing the scene
      setFadeClass('fade-out');
      setTimeout(() => {
        setCurrentSceneIndex((prev) => prev + 1);
        setCurrentDialogueIndex(0); // Reset dialogue index for the new scene
        setFadeClass('fade-in'); // Reset fade-in effect for the new scene
      }, 1000); // Duration of the fade-out animation
    } else {
      console.log('Game Over');
    }
  };

  function getCharacterById(characters: any, id: any) {
    return characters.find((character: any) => character.id === id);
  }

  useEffect(() => {
    // Reset state when the scene changes
    setShowCharacters(false);
    setCurrentDialogueIndex(-1);

    // Show characters after 3 seconds
    const characterTimer = setTimeout(() => {
      setShowCharacters(true);

      // Show the first dialogue 2 seconds after characters appear
      const dialogueTimer = setTimeout(() => {
        setCurrentDialogueIndex(0);
      }, 2000);

      return () => clearTimeout(dialogueTimer);
    }, 3000);

    return () => clearTimeout(characterTimer);
  }, [currentSceneIndex]);

  return (

    <div className={`scene ${fadeClass}`} style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center', height: '100vh', width: '100vw'}}>
    {showCharacters &&
      characters.map((character) => (
        <Character key={character.id} character={character} />
      ))}
    {currentDialogueIndex >= 0 && (
      <DialogueBox character={getCharacterById(characters, dialogues[currentDialogueIndex].characterId)} dialogue={dialogues[currentDialogueIndex].text} />
    )}
    {!isLastScene || !isLastDialogue ? (
      <NextButton onClick={handleNext} />
    ) : (
      <></>
    )}
  </div>

    // <div className={`scene ${fadeClass}`} style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center', height: '100vh', width: '100vw' }}>
    //   {characters.map((character) => (
    //     <Character key={character.id} character={character} />
    //   ))}
    //   <DialogueBox character={getCharacterById(characters, dialogues[currentDialogueIndex].characterId)} dialogue={dialogues[currentDialogueIndex].text} />
    //   {!isLastScene || !isLastDialogue ? (
    //     <NextButton onClick={handleNext} />
    //   ) : (<></>)}
    // </div>
  );
};

export default SceneComponent;
