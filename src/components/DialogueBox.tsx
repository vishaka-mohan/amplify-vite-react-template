import React from 'react';
import { Character } from '../models/CharacterModel';

interface DialogueBoxProps {
    character: Character;
    dialogue: string;
    audioUrl: string;
}

const DialogueBox: React.FC<DialogueBoxProps> = ({ dialogue, character }) => {
  return (
    <div className="dialogue-box" style={{ 
      position: 'absolute',
      bottom: '10%',
      width: '30%',
      left: character.position.x + (character.isLeftSide ? 300 : -400),
      top: character.position.y,
      color: 'white',
      fontSize: '20px',
      fontWeight: 'bold',
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      padding: '15px',
      borderRadius: '20px',
      border: '2px solid white',
      position: 'relative'
    }}>
      <div style={{
        content: '""',
        position: 'absolute',
        bottom: '-20px',
        left: character.isLeftSide ? '20px' : 'auto',
        right: character.isLeftSide ? 'auto' : '20px',
        width: '0',
        height: '0',
        borderLeft: '10px solid transparent',
        borderRight: '10px solid transparent',
        borderTop: '20px solid rgba(0, 0, 0, 0.7)'
      }} />
      <p>{character.name}: {dialogue}</p>
    </div>
  );
};

export default DialogueBox;
