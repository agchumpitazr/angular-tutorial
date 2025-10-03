import { Component } from '@angular/core';
import { MenuHeaderComponent } from './menu-header/menu-header.component';
import { MenuOptionsComponent } from './menu-options/menu-options.component';

@Component({
  selector: 'gifs-side-menu',
  imports: [MenuHeaderComponent, MenuOptionsComponent],
  templateUrl: './menu.component.html'
})
export class MenuComponent {

}
