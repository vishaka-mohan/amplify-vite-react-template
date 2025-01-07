import React from 'react';
import { Character } from '../models/CharacterModel';

interface CharacterProps {
  character: Character;
}

const CharacterComponent: React.FC<CharacterProps> = ({ character }) => {
  return (
    <img
      src={character.image}
      alt={character.name}
      style={{
        position: 'absolute',
        left: character.position.x,
        top: character.position.y,
        width: '25%', // Image width is 10% of the parent container's width
        height: 'auto'
      }}
    />
  );
};

export default CharacterComponent;
