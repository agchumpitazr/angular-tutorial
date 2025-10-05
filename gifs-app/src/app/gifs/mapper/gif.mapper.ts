import { Gif } from "../interfaces/gif.interface";
import { GiphyItem } from "../interfaces/giphy.interface";

export class GifMapper {
  static mapGiphyToGif(giphyItem: GiphyItem): Gif {
    return {
      id: giphyItem.id,
      title: giphyItem.title,
      url: giphyItem.images.fixed_height.url,
    }
  }

  static mapGiphyListToGifList(giphyItems: GiphyItem[]): Gif[] {
    return giphyItems.map(this.mapGiphyToGif);
  }
}
