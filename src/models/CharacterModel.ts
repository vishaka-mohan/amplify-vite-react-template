export class Character {
    id: string;
    name: string;
    image: string; // Path to the character image
    position: { x: number; y: number }; // Position on the screen
    isLeftSide: boolean; // Whether the character is on the left side of the screen
  
    constructor(id: string, name: string, image: string, position: { x: number; y: number },isLeftSide: boolean) {
      this.id = id;
      this.name = name;
      this.image = image;
      this.position = position;
      this.isLeftSide = isLeftSide;
    }
  }
  