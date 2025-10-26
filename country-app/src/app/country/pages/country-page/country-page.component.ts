import { Component, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { CountryService } from '../../services/country.service';
import { NotFound } from "country-app/src/app/shared/components/not-found/not-found";
import { CountryInformation } from "./country-information/country-information";

@Component({
  selector: 'app-country-page',
  imports: [NotFound, CountryInformation],
  templateUrl: './country-page.component.html',
})
export class CountryPageComponent {
  // .snapshot : it is not reactive, it needs to change the complete route
  countryCode = inject(ActivatedRoute).snapshot.params['code'] // :code -> the name in the route "by/:code"
  countryService = inject(CountryService);

  countryResource = rxResource({
    params: () => ({code: this.countryCode}),
    stream: ({params}) => {
      return this.countryService.searchCountryByAlphaCode(params.code);
    }
  })
}
