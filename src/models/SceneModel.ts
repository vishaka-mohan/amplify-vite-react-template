import { Character } from "./CharacterModel";

export class Scene {
    id: string;
    backgroundImage: string;
    characters: Character[];
    dialogues: { characterId: string; text: string; dialoguePath: string }[];
    showNotebook: boolean;
  
    constructor(
      id: string,
      backgroundImage: string,
      characters: Character[],
      dialogues: { characterId: string; text: string, dialoguePath: string }[],
      showNotebook: boolean
    ) {
      this.id = id;
      this.backgroundImage = backgroundImage;
      this.characters = characters;
      this.dialogues = dialogues;
      this.showNotebook = showNotebook;
    }
  }
  