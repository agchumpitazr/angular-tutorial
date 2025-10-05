import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '@environments/environment';
import type { GiphyResponse } from '../interfaces/giphy.interface';
import { Gif } from '../interfaces/gif.interface';
import { GifMapper } from '../mapper/gif.mapper';

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
    this.http
      .get<GiphyResponse>(`${environment.giphyUrl}/gifs/search`, {
        params: {
          api_key: environment.giphyApiKey,
          q: query,
          limit: '25',
        },
      })
      .subscribe((response) => {
        const gifSearch = GifMapper.mapGiphyListToGifList(response.data);
        console.log({ gifSearch });
      });
  }
}
