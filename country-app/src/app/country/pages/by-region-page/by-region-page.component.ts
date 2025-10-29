import { Component, inject, linkedSignal, signal } from '@angular/core';
import { CountryTableComponent } from '../../components/country-table/country-table.component';
import type { Region } from '../../interfaces/region.type';
import { rxResource } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';
import { CountryService } from '../../services/country.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-by-region-page',
  imports: [CountryTableComponent],
  templateUrl: './by-region-page.component.html',
})
export class ByRegionPageComponent {
  public regions: Region[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania', 'Antarctic'];
  countryServide = inject(CountryService);

  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);
  queryParam = (this.activatedRoute.snapshot.queryParamMap.get('region')) as Region;

  selectedRegion = linkedSignal<Region>(() => this.queryParam ?? 'Americas');

  selectRegion(region: Region) {
    this.selectedRegion.set(region);
  }


  countryResource = rxResource({
    params: () => ({ query: this.selectedRegion() }),
    stream: ({ params }) => {
      // Destructure params to get query
      if (!params.query) return of([]);

      this.router.navigate(['/country/by-region'], {
        queryParams: {
          query: params.query
        }
      })

      return this.countryServide.searchByRegion(params.query); // Convert Observable to Promise
    },
  });
}

