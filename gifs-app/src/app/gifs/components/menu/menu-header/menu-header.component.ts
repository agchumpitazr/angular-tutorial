import { ChangeDetectionStrategy, Component } from '@angular/core';
import { environment } from '@environments/environment';
// import { environment } from '../../../../../environments/environment'; //? Before tsconfig paths

@Component({
  selector: 'gifs-side-menu-header',
  imports: [],
  templateUrl: './menu-header.component.html',
})
export class MenuHeaderComponent {
  envs = environment;
}
