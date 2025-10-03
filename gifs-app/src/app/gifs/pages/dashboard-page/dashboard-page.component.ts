import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuComponent } from '../../components/menu/menu.component';

@Component({
  // selector: 'app-dashboard-page',
  imports: [RouterOutlet, MenuComponent],
  templateUrl: './dashboard-page.component.html',
})
export default class DashboardPageComponent { // default export to support loadComponent in routes

}
