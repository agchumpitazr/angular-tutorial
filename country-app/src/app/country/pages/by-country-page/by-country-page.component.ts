import { Component, inject, resource, signal } from '@angular/core';
import { CountryTableComponent } from '../../components/country-table/country-table.component';
import { CountrySearchInputComponent } from '../../components/country-search-input/country-search-input.component';
import { CountryService } from '../../services/country.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-by-country-page',
  imports: [CountryTableComponent, CountrySearchInputComponent],
  templateUrl: './by-country-page.component.html',
})
export class ByCountryPageComponent {
  countryServide = inject(CountryService);
  query = signal('');

  countryResource = resource({
    params: () => ({ query: this.query() }),
    loader: async ({ params }) => {
      // Destructure params to get query
      if (!params.query) return [];
      return await firstValueFrom(this.countryServide.searchByCountry(params.query)); // Convert Observable to Promise
    },
  });

  // isLoading = signal(false);
  // isError = signal<string | null>(null);
  // countries = signal<Country[]>([]);

  // onSearch(query: string) {
  //   if (!query || query.length === 0) return;
  //   if (this.isLoading()) return;
  //   this.isError.set(null);
  //   this.isLoading.set(true);

  //   this.countryServide.searchByCapital(query).subscribe((countriesResp) => {
  //     this.countries.set(countriesResp);
  //     this.isLoading.set(false);
  //   });
  // }
}
