import { Character } from "./CharacterModel";

export class Scene {
    id: string;
    backgroundImage: string;
    characters: Character[];
    dialogues: { characterId: string; text: string }[];
  
    constructor(
      id: string,
      backgroundImage: string,
      characters: Character[],
      dialogues: { characterId: string; text: string }[]
    ) {
      this.id = id;
      this.backgroundImage = backgroundImage;
      this.characters = characters;
      this.dialogues = dialogues;
    }
  }
  