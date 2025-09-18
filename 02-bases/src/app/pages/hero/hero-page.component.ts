import { UpperCasePipe } from "@angular/common";
import { Component, computed, signal } from "@angular/core";

@Component({
  templateUrl: './hero-page.component.html',
  imports: [UpperCasePipe] // Import the pipe to use it in the template
})
export class HeroPageComponent {
  name = signal('Ironman');
  age = signal(45);

  heroDescription = computed(() => {
    const description = `${this.name()} - ${this.age()}`;
    console.log('Computed:', { description });
    return description;
  }); // Computed signal that derives its value from other signals

  // getHeroDescription() {
  //   return `${this.name()} - ${this.age()}`;
  // }

  capitalizeName = computed(() => this.name().toUpperCase());

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
