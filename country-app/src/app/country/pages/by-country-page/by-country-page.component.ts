import { Component } from '@angular/core';
import { CountryTableComponent } from "../../components/country-table/country-table.component";
import { CountrySearchInputComponent } from "../../components/country-search-input/country-search-input.component";

@Component({
  selector: 'app-by-country-page',
  imports: [CountryTableComponent, CountrySearchInputComponent],
  templateUrl: './by-country-page.component.html',
})
export class ByCountryPageComponent { }
