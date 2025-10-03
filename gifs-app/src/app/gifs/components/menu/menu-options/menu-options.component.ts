import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from "@angular/router";

interface MenuOptions {
  icon: string;
  label: string;
  router: string;
  subLabel: string;
}


@Component({
  selector: 'gifs-side-menu-options',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './menu-options.component.html',
})
export class MenuOptionsComponent {
    menuOptions: MenuOptions[] = [
    { icon: 'fa-solid fa-chart-line', label: 'Trending', router: '/dashboard/trending', subLabel: 'The best gifs' },
    { icon: 'fa-solid fa-magnifying-glass', label: 'Buscador', router: '/dashboard/search', subLabel: 'Buscador gifs' },
  ]

}
