import React, { useEffect, useState } from 'react';
//import { Scene } from '../models/SceneModel';
import DialogueBox from './DialogueBox';
import NextButton from './NextButton';
import Character from './Character';
import { downloadData } from 'aws-amplify/storage';
import Notebook from './Notebook';
import PuzzleDrawingScene from './PuzzleDrawingScene';
import VoicePuzzleScene from './VoicePuzzleScene';
import NumberPuzzleScene from './NumberPuzzleScene';

interface SceneProps {
  scenes: any[];
}

const SceneComponent: React.FC<SceneProps> = ({ scenes }) => {
  const [currentSceneIndex, setCurrentSceneIndex] = useState(0);
  const [currentDialogueIndex, setCurrentDialogueIndex] = useState(0);
  const [fadeClass, setFadeClass] = useState('fade-in');
  const [showCharacters, setShowCharacters] = useState(false);
  const [audioUrls, setAudioUrls] = useState<string[]>([]);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  //let dialogueAudio = new Audio()
  

  const currentScene = scenes[currentSceneIndex];
  const isPuzzleScene = currentScene.type === 'puzzle' || currentScene.type === 'voice-puzzle' || currentScene.type === 'number-puzzle';
  //const { backgroundImage, characters, dialogues, showNotebook } = currentScene;

 
  const backgroundImage = currentScene.backgroundImage;
  const characters = !isPuzzleScene ? currentScene.characters : [];
  const dialogues = !isPuzzleScene ? currentScene.dialogues : [];
  const showNotebook = currentScene.showNotebook;
  const isLastDialogue = currentDialogueIndex === dialogues.length - 1;
  const isLastScene = currentSceneIndex === scenes.length - 1;
  const textToAdd = isPuzzleScene ? currentScene.textToAdd : ''


  const notebookContent = [
    "- Location: Kumayama Village, Frost festival",
    "- Date: 5 January 1999",
    "- I still miss you Naoto, my friend. I will definitely find out what happened to you at this village and how you disappeared. That is my promise to you. Rest in peace.",
    "- Villagers talk about past disappearances. They say the snow spirit is real?? I need to find out",
    "- Chant: 'Beneath the frost, the heart endures; in snow’s embrace, we find our cure.'  Need to find out what this is",
    "- Mr. Blacksmith was skeptical about the spirit but he does not want to talk about it. I can see a sign, a mural perhaps, hanging towards the back of his little shop. I have seen this mural at many places in this village. Is this kind of a village emblem or logo or something?"
  ];

    // const handleNext = () => {
    //     if (!isLastDialogue) {
    //     // Show next dialogue in the current scene
    //     setCurrentDialogueIndex((prev) => prev + 1);
    //     //dialogueAudio.pause();
    //     if(audio)
    //         audio.pause()
    //     } else if (!isLastScene) {
    //     // Trigger fade-out before changing the scene
    //     setFadeClass('fade-out');
    //     if(audio)
    //         audio.pause()
    //     //dialogueAudio.pause();
    //     setTimeout(() => {
    //         setCurrentSceneIndex((prev) => prev + 1);
    //         setCurrentDialogueIndex(0); // Reset dialogue index for the new scene
    //         setFadeClass('fade-in'); // Reset fade-in effect for the new scene
    //     }, 1000); // Duration of the fade-out animation
    //     } else {
    //     console.log('Game Over');
    //     }
    // };
    const handleNext = () => {
        if (currentScene.type === 'puzzle' || currentScene.type === 'voice-puzzle' || currentScene.type === 'number-puzzle') {
          // For puzzle scenes, skip directly to the next scene
          if (!isLastScene) {
            setFadeClass('fade-out');
            setTimeout(() => {
              setCurrentSceneIndex((prev) => prev + 1);
              setFadeClass('fade-in'); // Reset fade-in effect for the new scene
            }, 1000); // Duration of the fade-out animation
          } else {
            console.log('Game Over');
          }
        } else {
          // For regular scenes
          if (!isLastDialogue) {
            // Show next dialogue in the current scene
            setCurrentDialogueIndex((prev) => prev + 1);
            if (audio) audio.pause();
          } else if (!isLastScene) {
            // Trigger fade-out before changing the scene
            setFadeClass('fade-out');
            if (audio) audio.pause();
            setTimeout(() => {
              setCurrentSceneIndex((prev) => prev + 1);
              setCurrentDialogueIndex(0); // Reset dialogue index for the new scene
              setFadeClass('fade-in'); // Reset fade-in effect for the new scene
            }, 1000); // Duration of the fade-out animation
          } else {
            console.log('Game Over');
          }
        }
      };
      

  function getCharacterById(characters: any, id: any) {
    return characters.find((character: any) => character.id === id);
  }


  useEffect(() => {


    async function preloadAudioFiles() {
        const urls: string[] = [];
        for (const dialogue of dialogues) {
            const { body } = await downloadData({ path: dialogue.dialoguePath }).result;
            const audioBlob = await body.blob();
            const audioUrl = URL.createObjectURL(audioBlob);
            urls.push(audioUrl);
        }
        setAudioUrls(urls);
    }

    setShowCharacters(false);
    setCurrentDialogueIndex(-1);
    setAudioUrls([]);
    setAudio(null);
    
    
    preloadAudioFiles();

    // Show characters after 3 seconds
    const characterTimer = setTimeout(() => {
      setShowCharacters(true);

      // Show the first dialogue 2 seconds after characters appear
      const dialogueTimer = setTimeout(() => {
        setCurrentDialogueIndex(0);
      }, 2000);

      return () => clearTimeout(dialogueTimer);
    }, 3000);

    return () => {
        clearTimeout(characterTimer);

    }

  }, [currentSceneIndex]);

  useEffect(() => {
    if (audio) {
        audio.pause();
        audio.currentTime = 0;
    }
    // Play the audio for the current dialogue
    if (currentDialogueIndex >= 0 && audioUrls[currentDialogueIndex]) {
      //dialogueAudio = new Audio(audioUrls[currentDialogueIndex]);
      const newAudio = new Audio(audioUrls[currentDialogueIndex]);
      setAudio(newAudio);
      newAudio.play();
    }
  }, [currentDialogueIndex]);


  if (currentScene.type === 'puzzle') {
    return (
        <div className={`scene ${fadeClass}`} style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center', height: '100vh', width: '100vw'}}>
            {showNotebook ? <Notebook content={notebookContent} /> : <></>} 
            <h1 style={{color: 'white'}}>{textToAdd}</h1>
            <PuzzleDrawingScene
        images={currentScene.images}
        correctAnswer={currentScene.correctAnswer}
        onCorrectAnswer={handleNext}
      />
        </div>
      
    );
  }

  if (currentScene.type === 'voice-puzzle') {
    return (
        <div className={`scene ${fadeClass}`} style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center', height: '100vh', width: '100vw'}}>
            {showNotebook ? <Notebook content={notebookContent} /> : <></>} 
            <h1 style={{color: 'white'}}>{textToAdd}</h1>
            <VoicePuzzleScene puzzle={currentScene} onComplete={handleNext}/>
        </div>
      
    );
  }

  if (currentScene.type === 'number-puzzle') {
    return (
        <div className={`scene ${fadeClass}`} style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center', height: '100vh', width: '100vw'}}>
            {showNotebook ? <Notebook content={notebookContent} /> : <></>} 
            <h2 style={{color: 'white'}}>{textToAdd}</h2>
            <NumberPuzzleScene onNext={handleNext}/>
        </div>
      
    );
  }

  return (

    <div className={`scene ${fadeClass}`} style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center', height: '100vh', width: '100vw'}}>
       {showNotebook ? <Notebook content={notebookContent} /> : <></>} 
      
    {showCharacters &&
      characters.map((character: any) => (
        <Character key={character.id} character={character} />
      ))}
    {currentDialogueIndex >= 0 && (
      <DialogueBox character={getCharacterById(characters, dialogues[currentDialogueIndex].characterId)} dialogue={dialogues[currentDialogueIndex].text} audioUrl={audioUrls[currentDialogueIndex]} />
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
