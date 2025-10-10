import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { RestCountryResponse } from '../interfaces/rest-country.interface';
import { CountryMapper } from '../mappers/country.mapper';

const API_URL = 'https://restcountries.com/v3.1';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  private http = inject(HttpClient);

  searchByCapital(query: string) {
    query = query.toLowerCase().trim();
    return this.http.get<RestCountryResponse[]>(`${API_URL}/capital/${query}`)
    .pipe(
      map((countries) => CountryMapper.toCountries(countries))
    );
  }
}
