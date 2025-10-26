import { Component, effect, input, output, signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'country-search-input',
  imports: [],
  templateUrl: './country-search-input.component.html',
})
export class CountrySearchInputComponent {

  searchValue = output<string>();
  placeholder = input<string>('Search...');
  inputValue = signal<string>('');

  debounceEffect = effect((onCleanup) => { // Everytime the signal chance, this will run again
    const value = this.inputValue(); // to save the changes
    const timeout = setTimeout(() => {
      this.searchValue.emit(value);
    }, 500);
    onCleanup(() => { // onCleanup will run every time the effect is executed, after the component is deleted
      clearTimeout(timeout);
    })
  });

  onSearch(value: string) {
    console.log(value);
  }
}
