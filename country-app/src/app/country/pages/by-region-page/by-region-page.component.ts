import { Component, inject, signal } from '@angular/core';
import { CountryTableComponent } from '../../components/country-table/country-table.component';
import type { Region } from '../../interfaces/region.type';
import { rxResource } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';
import { CountryService } from '../../services/country.service';

@Component({
  selector: 'app-by-region-page',
  imports: [CountryTableComponent],
  templateUrl: './by-region-page.component.html',
})
export class ByRegionPageComponent {
  public regions: Region[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania', 'Antarctic'];
  countryServide = inject(CountryService);
  selectedRegion = signal<Region | null>(null);

  selectRegion(region: Region) {
    this.selectedRegion.set(region);
  }


  countryResource = rxResource({
    params: () => ({ query: this.selectedRegion() }),
    stream: ({ params }) => {
      // Destructure params to get query
      if (!params.query) return of([]);
      return this.countryServide.searchByRegion(params.query); // Convert Observable to Promise
    },
  });
}

