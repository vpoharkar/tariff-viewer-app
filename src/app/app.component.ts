import { Component } from '@angular/core';
import { Router } from '@angular/router';

export interface NavLink {
  path: string;
  label: string;
  icon: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'tariff-app';

  constructor(private readonly router: Router) {}

  /**
   * Following routes are not supported at the moment as this version has problems with angular router
   *
   * @type {NavLink[]}
   * @memberof AppComponent
   */
  public links: NavLink[] = [
    {
      path: '/comparison',
      label: 'Internet Comparison',
      icon: 'home',
    },
    {
      path: '/tariffs',
      label: 'Available tariffs',
      icon: 'favorite',
    },
  ];
}
