import { NgClass } from "@angular/common";
import { Component, signal } from "@angular/core";


interface Character {
  id: number;
  name: string;
  power: number;
}

@Component({
  selector: 'dragonball-super-page', //? It is not needed because it is a page component, not a reusable component
  templateUrl: './dragonball-super-page.component.html',
  imports: [NgClass],
})
export class DragonballSuperPageComponent {

  name = signal('');
  power = signal(0);

  characters = signal<Character[]>([
    { id: 1, name: 'Goku', power: 15000 },
    { id: 2, name: 'Vegeta', power: 12000 },
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
