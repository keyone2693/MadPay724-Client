import { Injectable } from '@angular/core';

import { map, filter } from 'rxjs/operators';

import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

// const APP_TITLE = 'Title';
const SEPARATOR = ' > ';

@Injectable({
  providedIn: 'root'
})
export class TitleService {
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
  ) { }

  static ucFirst(text: string) {
    if (!text) { return text; }
    return text.charAt(0).toUpperCase() + text.slice(1);
  }

  init() {
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map(() => {
        let route = this.activatedRoute;
        while (route.firstChild) { route = route.firstChild; }
        return route;
      }),
      filter((route) => route.outlet === 'primary'),
      map((route) => route.snapshot),
      map((snapshot) => {
        if (snapshot.data.title) {
          if (snapshot.paramMap.get('id') !== null) {
            return snapshot.data.title + SEPARATOR + snapshot.paramMap.get('id');
          }
          return snapshot.data.title;
        } else {
          // If not, we do a little magic on the url to create an approximation
          return this.router.url.split('/').reduce((acc, frag) => {
            if (acc && frag) { acc += SEPARATOR; }
            return acc + TitleService.ucFirst(frag);
          });
        }
      }))
      // .subscribe((pathString) => this.titleService.setTitle(`${pathString} - ${APP_TITLE}`));
       .subscribe((pathString) => this.titleService.setTitle(`${pathString}`));
  }
}
