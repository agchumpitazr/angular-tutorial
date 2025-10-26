import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, delay, map, tap } from 'rxjs/operators';
import { RestCountryResponse } from '../interfaces/rest-country.interface';
import { CountryMapper } from '../mappers/country.mapper';
import { Observable, of, throwError } from 'rxjs';
import { Country } from '../interfaces/country.interface';
import { Region } from '../interfaces/region.type';

const API_URL = 'https://restcountries.com/v3.1';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  private http = inject(HttpClient);
  private queryCacheCapital = new Map<string, Country[]>();
  private queryCacheCountry = new Map<string, Country[]>();
  private queryCacheRegion = new Map<Region, Country[]>();

  searchByCapital(query: string): Observable<Country[]> {
    query = query.toLowerCase().trim();
    if (this.queryCacheCapital.has(query)) {
      return of(this.queryCacheCapital.get(query) ?? []);
    }
    return this.http.get<RestCountryResponse[]>(`${API_URL}/capital/${query}`).pipe(
      map((resp) => CountryMapper.toCountries(resp)),
      tap((countries) => this.queryCacheCapital.set(query, countries)),
      catchError((err) => {
        return throwError(() => new Error(`Capital not found "${query}"`));
      })
    );
  }

  searchByCountry(query: string): Observable<Country[]> {
    query = query.toLowerCase().trim();
    if (this.queryCacheCountry.has(query)) {
      return of(this.queryCacheCountry.get(query) ?? []);
    }
    return this.http.get<RestCountryResponse[]>(`${API_URL}/name/${query}`).pipe(
      map((resp) => CountryMapper.toCountries(resp)),
      tap((countries) => this.queryCacheCountry.set(query, countries)),
      delay(2000),
      catchError((error) => {
        return throwError(() => new Error(`Country not found "${query}"`));
      })
    );
  }

  searchByRegion(region: Region): Observable<Country[]> {
    if (this.queryCacheRegion.has(region)) {
      return of(this.queryCacheRegion.get(region) ?? []);
    }
    return this.http.get<RestCountryResponse[]>(`${API_URL}/region/${region}`).pipe(
      map((resp) => CountryMapper.toCountries(resp)),
      tap((countries) => this.queryCacheRegion.set(region, countries)),
      catchError((error) => {
        return throwError(() => new Error(`Region not found "${region}"`));
      })
    );
  }

  searchCountryByAlphaCode(code: string): Observable<Country | undefined> {
    return this.http.get<RestCountryResponse[]>(`${API_URL}/alpha/${code}`).pipe(
      map((resp) => CountryMapper.toCountries(resp)),
      map((countries) => countries.at(0)),
      catchError((error) => {
        return throwError(() => new Error(`Country not found with the code "${code}"`));
      })
    );
  }
}
