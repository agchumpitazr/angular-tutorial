import { Component, signal } from "@angular/core";

@Component({
  templateUrl: './hero-page.component.html',
})
export class HeroPageComponent {
  name = signal('Ironman');
  age = signal(45);

  getHeroDescription() {
    return `${this.name()} - ${this.age()}`;
  }

  changeHero() {
    this.name.set('Spiderman'); // Sets the signal to a new value, no dependency tracking
    this.age.set(22); // Sets the signal to a new value, no dependency tracking
  }

  resetForm() {
    this.name.set('Ironman'); // Sets the signal to a new value, no dependency tracking
    this.age.set(45); // Sets the signal to a new value, no dependency tracking
  }

  changeAge() {
    this.age.set(60); // Sets the signal to a new value, no dependency tracking
  }
}
