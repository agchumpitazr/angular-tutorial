import { Component, inject, signal } from '@angular/core';
import { CountryTableComponent } from '../../components/country-table/country-table.component';
import { CountrySearchInputComponent } from '../../components/country-search-input/country-search-input.component';
import { CountryService } from '../../services/country.service';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'app-by-capital-page',
  imports: [CountryTableComponent, CountrySearchInputComponent],
  templateUrl: './by-capital-page.component.html',
})
export class ByCapitalPageComponent {
  countryServide = inject(CountryService);

  isLoading = signal(false);
  isError = signal<string | null>(null);
  countries = signal<Country[]>([]);

  onSearch(query: string) {
    if (!query || query.length === 0) return;
    if (this.isLoading()) return;
    this.isError.set(null);
    this.isLoading.set(true);

    this.countryServide.searchByCapital(query)
    .subscribe({ // Using the object form of subscribe to handle next and error separately
      next: (countries) => { // Handle successful response. Next callback is called when data is received
        this.countries.set(countries);
        this.isLoading.set(false);
      },
      error: (err) => { // Handle error response
        this.isLoading.set(false);
        this.isError.set(err);
        this.countries.set([]);
      }

    });
  }
}
