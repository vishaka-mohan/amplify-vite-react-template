export class Character {
    id: string;
    name: string;
    image: string; // Path to the character image
    position: { x: number; y: number }; // Position on the screen
  
    constructor(id: string, name: string, image: string, position: { x: number; y: number }) {
      this.id = id;
      this.name = name;
      this.image = image;
      this.position = position;
    }
  }
  