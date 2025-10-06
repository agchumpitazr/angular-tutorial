import { AfterViewInit, Component, ElementRef, inject, viewChild } from '@angular/core';
import { GifService } from '../../services/gifs.service';
import { ScrollStageService } from '../../services/scroll-state.service';


@Component({
  selector: 'app-trending-page',
  templateUrl: './trending-page.component.html',
})
export default class TrendingPageComponent implements AfterViewInit {

  ngAfterViewInit(): void {
    const scrollDiv = this.scrollDivRef()?.nativeElement;
    if(!scrollDiv) return;
    scrollDiv.scrollTop = this.scrollStateService.trendingScrollState();
  }
  scrollStateService = inject(ScrollStageService);
  gifService = inject(GifService);
  scrollDivRef = viewChild<ElementRef<HTMLDivElement>>('gifsContainer');

  onScroll(event: Event) {
    const scrollDiv = this.scrollDivRef()?.nativeElement;
    if(!scrollDiv) return;

    const scrollTop = scrollDiv.scrollTop; // How far the user has scrolled
    const clientHeight = scrollDiv.clientHeight; // Height of the visible area
    const scrollHeight = scrollDiv.scrollHeight; // Total height of the content

    const isAtBottom = scrollTop + clientHeight >= scrollHeight - 300; // 10px threshold

    this.scrollStateService.trendingScrollState.set(scrollTop);
    if (isAtBottom) {
      this.gifService.loadTrendingGifs();
    }
    console.log(scrollDiv , isAtBottom);
  }
}
