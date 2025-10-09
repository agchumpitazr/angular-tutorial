import { Component, input, output } from '@angular/core';

@Component({
  selector: 'country-search-input',
  imports: [],
  templateUrl: './country-search-input.component.html',
})
export class CountrySearchInputComponent {

  searchValue = output<string>();
  placeholder = input<string>('Search...');

  onSearch(value: string) {
    console.log(value);
  }
}
