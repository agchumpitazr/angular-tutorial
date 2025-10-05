import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '@environments/environment';
import type { GiphyResponse } from '../interfaces/giphy.interface';
import { Gif } from '../interfaces/gif.interface';
import { GifMapper } from '../mapper/gif.mapper';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class GifService {
  private http = inject(HttpClient); // Inyectar HttpClient

  trendingGifs = signal<Gif[]>([]);
  trengingGifsLoading = signal<boolean>(true);

  constructor() {
    this.loadTrendingGifs();
  }

  loadTrendingGifs() {
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

  searchGifs(query: string) {
    return this.http
      .get<GiphyResponse>(`${environment.giphyUrl}/gifs/search`, {
        params: {
          api_key: environment.giphyApiKey,
          q: query,
          limit: '25',
        },
      }).pipe( // operador para transformar el observable
        // tap(): este operador permite ejecutar efectos secundarios sin modificar el flujo de datos
        // map() : este operador transforma los datos emitidos por el observable
        map(( { data } ) => data), // extraemos solo la propiedad data del objeto de respuesta
        map( (items) => GifMapper.mapGiphyListToGifList(items)

        )
      )
      // .subscribe((response) => {
      //   const gifSearch = GifMapper.mapGiphyListToGifList(response.data);
      //   console.log({ gifSearch });
      // });
  }
}
