//import React, { useEffect } from 'react';
import { Character } from '../models/CharacterModel';

interface DialogueBoxProps {
    character: Character;
  dialogue: string;
  audioUrl: string;
}

const DialogueBox: React.FC<DialogueBoxProps> = ({ dialogue, character }) => {
    // useEffect(() => {
    //     if (audioUrl) {
    //       const audio = new Audio(audioUrl);
    //       audio.play();
    //     }
    //   }, [audioUrl]);
  return (
    <div className="dialogue-box" style={{ position: 'absolute', bottom: '10%', width: '30%', left: character.position.x, top: character.position.y + 350 , color: 'white', fontSize: '20px', fontWeight: 'bold'}}>
      <p>{character.name}: {dialogue}</p>
    </div>
  );
};

export default DialogueBox;
