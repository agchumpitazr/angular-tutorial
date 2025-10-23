import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, delay, map } from 'rxjs/operators';
import { RestCountryResponse } from '../interfaces/rest-country.interface';
import { CountryMapper } from '../mappers/country.mapper';
import { Observable, throwError } from 'rxjs';
import { Country } from '../interfaces/country.interface';

const API_URL = 'https://restcountries.com/v3.1';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  private http = inject(HttpClient);

  searchByCapital(query: string): Observable<Country[]> {
    query = query.toLowerCase().trim();
    return this.http.get<RestCountryResponse[]>(`${API_URL}/capital/${query}`)
    .pipe(
      map((countries) => CountryMapper.toCountries(countries)),
      catchError((err) => {
        return throwError(() => new Error(`Capital not found "${query}"`));
      })
    );
  }

  searchByCountry(query: string): Observable<Country[]> {
    query = query.toLowerCase().trim();
    return this.http.get<RestCountryResponse[]>(`${API_URL}/name/${query}`)
    .pipe(
      map((countries) => CountryMapper.toCountries(countries)),
      delay(2000),
      catchError((error) => {
        return throwError(() => new Error(`Country not found "${query}"`));
      })
    );
  }
}
