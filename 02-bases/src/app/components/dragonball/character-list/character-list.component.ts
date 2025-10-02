import type { Character } from '02-bases/src/app/interfaces/character.interface';
import { NgClass } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
  selector: 'dragonball-character-list',
  templateUrl: './character-list.component.html',
  imports: [NgClass]
})
export class CharacterListComponent {
  characters = input.required<Character[]>();
  listName = input<string>('No name');
}
