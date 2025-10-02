import { Character } from '02-bases/src/app/interfaces/character.interface';
import { Component, output, signal } from '@angular/core';

@Component({
  selector: 'dragonball-character-add',
  imports: [],
  templateUrl: './character-add.component.html',
})
export class CharacterAddComponent {
  name = signal('');
  power = signal(0);

  newCharacter = output<Character>(); // EventEmitter alternative

  createCharacter() : Character | undefined {
    if(!this.name() || !this.power() || this.power() <= 0) return;
    const newCharacter: Character =  {
      id: Math.floor(Math.random() * 1000),
      name: this.name(),
      power: this.power(),
    }
    return newCharacter;
  }

  addCharacter() {
    const newCharacter: Character | undefined =  this.createCharacter();
    if(!newCharacter) return;
    this.newCharacter.emit(newCharacter);
    this.resetForm();
  }

  resetForm() {
    this.name.set('');
    this.power.set(0);
  }
}
