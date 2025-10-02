import { Injectable, signal } from '@angular/core';
import { Character } from '../interfaces/character.interface';

@Injectable({ providedIn: 'root' }) // Singleton. It is created once when the app starts
export class DragonballService {
  characters = signal<Character[]>([
    { id: 1, name: 'Goku', power: 15000 },
    { id: 2, name: 'Vegeta', power: 12000 },
  ]);

  addCharacter(character: Character) {
    this.characters.update((characters) => [...characters, character]);
  }
}
