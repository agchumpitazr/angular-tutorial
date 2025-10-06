import { Component, ElementRef, inject, viewChild } from '@angular/core';
import { ListComponent } from "../../components/list/list.component";
import { GifService } from '../../services/gifs.service';

@Component({
  selector: 'app-trending-page',
  // imports: [ListComponent],
  templateUrl: './trending-page.component.html',
})
export default class TrendingPageComponent {
  gifService = inject(GifService);
  scrollDivRef = viewChild<ElementRef<HTMLDivElement>>('gifsContainer');

  onScroll(event: Event) {
    const scrollDiv = this.scrollDivRef()?.nativeElement;
    if(!scrollDiv) return;

    const scrollTop = scrollDiv.scrollTop; // How far the user has scrolled
    const clientHeight = scrollDiv.clientHeight; // Height of the visible area
    const scrollHeight = scrollDiv.scrollHeight; // Total height of the content

    const isAtBottom = scrollTop + clientHeight >= scrollHeight - 300; // 10px threshold

    if (isAtBottom) {
      this.gifService.loadTrendingGifs();
    }
    console.log(scrollDiv , isAtBottom);
  }
}
