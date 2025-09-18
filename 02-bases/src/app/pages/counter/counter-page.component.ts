import { Component, signal } from "@angular/core";

@Component({
  templateUrl: './counter-page.component.html',
  styleUrls: ['./counter-page.component.css']
})
export class CounterPageComponent {
  counter = 10;
  counterSignal = signal(10);

  increaseBy(value: number) {
    this.counter += value;
    this.counterSignal.update(current => current + value); // Updates the signal and notifies dependents
  }

  decreaseBy(value: number) {
    this.counter -= value;
    this.counterSignal.update(current => current - value); // Updates the signal and notifies dependents
  }

  resetValue() {
    this.counter = 0;
    this.counterSignal.set(0); // Resets the signal to 0, no dependency tracking
  }
}
