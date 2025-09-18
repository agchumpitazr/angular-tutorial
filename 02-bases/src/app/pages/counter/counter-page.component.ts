import { Component } from "@angular/core";

@Component({
  templateUrl: './counter-page.component.html',
  styleUrls: ['./counter-page.component.css']
})
export class CounterPageComponent {
  counter = 10;

  increaseBy(value: number) {
    this.counter += value;
  }

  decreaseBy(value: number) {
    this.counter -= value;
  }

  resetValue() {
    this.counter = 10;
  }
}
