import { Component, inject, resource, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop'
import { firstValueFrom, of } from 'rxjs';

import { CountryTableComponent } from '../../components/country-table/country-table.component';
import { CountrySearchInputComponent } from '../../components/country-search-input/country-search-input.component';
import { CountryService } from '../../services/country.service';

@Component({
  selector: 'app-by-capital-page',
  imports: [CountryTableComponent, CountrySearchInputComponent],
  templateUrl: './by-capital-page.component.html',
})
export class ByCapitalPageComponent {
  countryServide = inject(CountryService);

  query = signal('');

  countryResource = rxResource({

    params: () => ({ query: this.query()}),
    stream: ({params}) => { // Destructure params to get query
      if (!params.query) return of([]);
      return this.countryServide.searchByCapital(params.query); // Convert Observable to Promise
    },

  });

  // countryResource = resource({
  //   params: () => ({ query: this.query()}),
  //   loader: async({params}) => { // Destructure params to get query
  //     // if (!this.query()) return [];
  //     if (!params.query) return [];
  //     return await firstValueFrom(this.countryServide.searchByCapital(params.query)); // Convert Observable to Promise
  //   }
  // });


  // isLoading = signal(false);
  // isError = signal<string | null>(null);
  // countries = signal<Country[]>([]);

  // onSearch(query: string) {
  //   if (!query || query.length === 0) return;
  //   if (this.isLoading()) return;
  //   this.isError.set(null);
  //   this.isLoading.set(true);

  //   this.countryServide.searchByCapital(query)
  //   .subscribe({ // Using the object form of subscribe to handle next and error separately
  //     next: (countries) => { // Handle successful response. Next callback is called when data is received
  //       this.countries.set(countries);
  //       this.isLoading.set(false);
  //     },
  //     error: (err) => { // Handle error response
  //       this.isLoading.set(false);
  //       this.isError.set(err);
  //       this.countries.set([]);
  //     }

  //   });
  // }
}
