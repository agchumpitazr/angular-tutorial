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

  characters = signal<Character[]>([
    { id: 1, name: 'Goku', power: 15000 },
    { id: 2, name: 'Vegeta', power: 12000 },
    { id: 3, name: 'Piccolo', power: 8000 },
  ]);

}
