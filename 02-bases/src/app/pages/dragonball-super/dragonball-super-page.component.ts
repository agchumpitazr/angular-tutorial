import { NgClass } from "@angular/common";
import { Component, signal } from "@angular/core";
import { CharacterListComponent } from "../../components/dragonball/character-list/character-list.component";
import { Character } from '../../interfaces/character.interface';
import { CharacterAddComponent } from "../../components/dragonball/character-add/character-add.component";

@Component({
  selector: 'dragonball-super-page', //? It is not needed because it is a page component, not a reusable component
  templateUrl: './dragonball-super-page.component.html',
  imports: [NgClass, CharacterListComponent, CharacterAddComponent],
})
export class DragonballSuperPageComponent {

  characters = signal<Character[]>([
    { id: 1, name: 'Goku', power: 15000 },
    { id: 2, name: 'Vegeta', power: 12000 },
  ]);

  addCharacter(character: Character) {
    this.characters.update(characters => [
      ...characters,
      character
    ]);
  }
}
