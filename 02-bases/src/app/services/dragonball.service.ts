import { effect, Injectable, signal } from '@angular/core';
import { Character } from '../interfaces/character.interface';

function loadFromLocalStorage(): Character[] {
  const characters = localStorage.getItem('characters');
  return characters ? JSON.parse(characters) : []; // If no characters, return empty array
}

@Injectable({ providedIn: 'root' }) // Singleton. It is created once when the app starts
export class DragonballService {

  characters = signal<Character[]>(loadFromLocalStorage()); // Load initial value from localStorage

  saveInLocalStorage = effect(() => {
    console.log('Characters count: ', this.characters());
    localStorage.setItem('characters', JSON.stringify(this.characters()));
  })

  addCharacter(character: Character) {
    this.characters.update((characters) => [...characters, character]);
  }
}
