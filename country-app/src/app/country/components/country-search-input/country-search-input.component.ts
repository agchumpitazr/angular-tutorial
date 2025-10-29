import { Component, effect, input, linkedSignal, output, signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'country-search-input',
  imports: [],
  templateUrl: './country-search-input.component.html',
})
export class CountrySearchInputComponent {

  searchValue = output<string>();
  placeholder = input<string>('Search...');
  debounceTime = input(1000);
  initialValue = input<string>();

  // when it needs to be the result of a computation
  inputValue = linkedSignal<string>(() => this.initialValue() ?? '');

  debounceEffect = effect((onCleanup) => { // Everytime the signal chance, this will run again
    const value = this.inputValue(); // to save the changes
    const timeout = setTimeout(() => {
      this.searchValue.emit(value);
    }, this.debounceTime());
    onCleanup(() => { // onCleanup will run every time the effect is executed, after the component is deleted
      clearTimeout(timeout);
    })
  });

  onSearch(value: string) {
    console.log(value);
  }
}
