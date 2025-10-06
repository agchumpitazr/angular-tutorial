import { HttpClient } from '@angular/common/http';
import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';
import { Gif } from '../interfaces/gif.interface';
import { GifMapper } from '../mapper/gif.mapper';
import type { GiphyResponse } from '../interfaces/giphy.interface';

function loadFromLocalStorage(): Record<string, Gif[]> {
  const characters = localStorage.getItem('searchedGifs');
  return characters ? JSON.parse(characters) : {};
}

@Injectable({ providedIn: 'root' })
export class GifService {
  private http = inject(HttpClient); // Inyectar HttpClient

  trengingGifsLoading = signal<boolean>(false);
  trendingGifs = signal<Gif[]>([]);
  private trendingPage = signal<number>(0);


  // searchHistory = signal<Record<string, Gif[]>>({}); // Record: tipo de dato que representa un objeto con claves de tipo string y valores de tipo Gif[]
  searchHistory = signal<Record<string, Gif[]>>(loadFromLocalStorage());
  searchHistoryKeys = computed(() => Object.keys(this.searchHistory()));

  saveGifsInLocalStorage = effect(() => {
    // effect: permite ejecutar código reactivo en respuesta a cambios en las señales (efectos secundarios)
    localStorage.setItem('searchedGifs', JSON.stringify(this.searchHistory()));
  });

  trendingGifGroup = computed<Gif[][]>(() => {
    const groups = [];
    for (let i = 0; i < this.trendingGifs().length; i += 3) {
      groups.push(this.trendingGifs().slice(i, i + 3));
    }
    return groups;
  });

  constructor() {
    this.loadTrendingGifs();
  }

  loadTrendingGifs(): void {
    if(this.trengingGifsLoading()) return;
    this.trengingGifsLoading.set(true);


    this.http
      .get<GiphyResponse>(`${environment.giphyUrl}/gifs/trending`, {
        params: {
          api_key: environment.giphyApiKey,
          limit: 25,
          offset: this.trendingPage() * 25,
        },
      })
      .subscribe((response) => {
        const gifs = GifMapper.mapGiphyListToGifList(response.data);
        this.trendingGifs.update(currentGifs => [...gifs, ...currentGifs]);
        this.trengingGifsLoading.set(false);
        this.trendingPage.update(page => page + 1);
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
      .pipe(
        // pipe() : este método permite encadenar múltiples operadores de RxJS para transformar, filtrar o realizar efectos secundarios en los datos emitidos por el observable
        // map() : este operador transforma los datos emitidos por el observable
        map(({ data }) => data), // extraemos solo la propiedad data del objeto de respuesta
        map((items) => GifMapper.mapGiphyListToGifList(items)),

        // tap(): este operador permite ejecutar efectos secundarios sin modificar el flujo de datos
        tap((items) => {
          this.searchHistory.update((history) => ({
            ...history,
            [query.toLowerCase()]: items,
          }));
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
