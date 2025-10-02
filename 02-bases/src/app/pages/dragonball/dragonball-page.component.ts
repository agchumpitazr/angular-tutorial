import { NgClass } from "@angular/common";
import { Component, computed, signal } from "@angular/core";


interface Character {
  id: number;
  name: string;
  power: number;
}

@Component({
  // selector: 'app-dragonball-page', //? It is not needed because it is a page component, not a reusable component
  templateUrl: './dragonball-page.component.html',
  imports: [NgClass],
})
export class DragonballPageComponent {

  name = signal('Gohan');
  power = signal(500);

  characters = signal<Character[]>([
    { id: 1, name: 'Goku', power: 15000 },
    { id: 2, name: 'Vegeta', power: 12000 },
    { id: 3, name: 'Piccolo', power: 8000 },
    { id: 4, name: 'Yamcha', power: 50 },
  ]);

  addCharacter() {
    const newCharacter: Character | undefined =  this.createCharacter();
    if(!newCharacter) return;
    this.characters.update(characters => [
      ...characters,
      newCharacter
    ]);
    this.resetForm();
  }

  createCharacter() : Character | undefined {
    if(!this.name() || !this.power() || this.power() <= 0) return;
    const newCharacter: Character =  {
      id: this.characters().length + 1,
      name: this.name(),
      power: this.power(),
    }
    return newCharacter;
  }

  resetForm() {
    this.name.set('');
    this.power.set(0);
  }

}
