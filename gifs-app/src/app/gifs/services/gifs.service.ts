import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { environment } from '@environments/environment';
import type { GiphyResponse } from '../interfaces/giphy.interface';
import { Gif } from '../interfaces/gif.interface';
import { GifMapper } from '../mapper/gif.mapper';
import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class GifService {
  private http = inject(HttpClient); // Inyectar HttpClient

  trendingGifs = signal<Gif[]>([]);
  trengingGifsLoading = signal<boolean>(true);

  searchHistory = signal<Record<string, Gif[]>>({}); // Record: tipo de dato que representa un objeto con claves de tipo string y valores de tipo Gif[]
  searchHistoryKeys = computed(() => Object.keys(this.searchHistory()));

  constructor() {
    this.loadTrendingGifs();
  }

  loadTrendingGifs(): void {
    this.http
      .get<GiphyResponse>(`${environment.giphyUrl}/gifs/trending`, {
        params: {
          api_key: environment.giphyApiKey,
          limit: '25',
        },
      })
      .subscribe((response) => {
        const gifs = GifMapper.mapGiphyListToGifList(response.data);
        this.trendingGifs.set(gifs);
        this.trengingGifsLoading.set(false);
        console.log(gifs);
      });
  }

  searchGifs(query: string): Observable<Gif[]> {
    return this.http
      .get<GiphyResponse>(`${environment.giphyUrl}/gifs/search`, {
        params: {
          api_key: environment.giphyApiKey,
          q: query,
          limit: '25',
        },
      })
      .pipe(// pipe() : este método permite encadenar múltiples operadores de RxJS para transformar, filtrar o realizar efectos secundarios en los datos emitidos por el observable
        // map() : este operador transforma los datos emitidos por el observable
        map(({ data }) => data), // extraemos solo la propiedad data del objeto de respuesta
        map((items) => GifMapper.mapGiphyListToGifList(items)),

        // tap(): este operador permite ejecutar efectos secundarios sin modificar el flujo de datos
        tap(items => {
          this.searchHistory.update(history => ({
            ...history,
            [query.toLowerCase()]: items
          }))
        })
      );
    // .subscribe((response) => {
    //   const gifSearch = GifMapper.mapGiphyListToGifList(response.data);
    //   console.log({ gifSearch });
    // });
  }

  getHistoryGifs(query: string): Gif[] {
    return this.searchHistory()[query.toLowerCase()] || [];
  }
}
