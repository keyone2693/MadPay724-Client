import { Component, OnInit, OnDestroy } from '@angular/core';
import * as skrollr from 'src/assets/wp-content/themes/munza/assets/js/vendor/skrollr.js';
import { StyleScriptService } from 'src/app/core/_services/common/styleScript.service';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { BlogIntro } from 'src/app/data/models/blog/blogIntro';
import 'src/app/shared/extentions/string.extentions';
import { filter } from 'rxjs/operators';
import { PersianCalendarService } from 'src/app/core/_base/pipe/PersianDatePipe/persian-date.service';

@Component({
  selector: 'app-blog-dir-intro',
  templateUrl: './blog-dir-intro.component.html',
  styleUrls: ['./blog-dir-intro.component.css']
})
export class BlogDirIntroComponent implements OnDestroy {
  subManager = new Subscription();
  skrollrObj: any;
  blogIntro: BlogIntro = {
    routeKind: 1,
    groupName: '',
    filter: '',
    year: '',
    month: '',
    page: 1
  };
  constructor(private styleService: StyleScriptService,
    private router: Router, private route: ActivatedRoute, private persianCalendarService: PersianCalendarService) {
    this.subManager.add(
      router.events.pipe(
        filter(event => event instanceof NavigationEnd)
      ).subscribe((event: NavigationEnd) => {
        this.loadData();
      })
    );
   
  }
  ngOnInit() {
    this.skrollrObj = skrollr.init({
      smoothScrolling: true,
      mobileDeceleration: 0.004,
      forceHeight: false
    });
  }
  loadData() {
    let urls: any;
    let params: any;
    this.subManager.add(
      this.route.url.subscribe(data => {
        urls = data[0];
      })
    );
    this.subManager.add(
      this.route.params.subscribe(data => {
        params = data;
      })
    );
    if (urls.path === 'page') {

      const page = params['pageNumber'];
      this.blogIntro.routeKind = 1;
      this.blogIntro.page = page;

    } else if (urls.path === 'search') {
      const filter = params['filter'];
      const page = params['pageNumber'];
      this.blogIntro.routeKind = 2;
      this.blogIntro.filter = filter;
      this.blogIntro.page = page;

    } else if (urls.path === 'group') {
      const groupName = params['name'];
      const page = params['pageNumber'];
      this.blogIntro.routeKind = 3;
      this.blogIntro.groupName = groupName;
      this.blogIntro.page = page;

    } else if (urls.path === 'date') {
      const year = params['year'];
      const month = params['month'];
      const page = params['pageNumber'];
      this.blogIntro.routeKind = 4;
      this.blogIntro.year = year;
      this.blogIntro.month = month;
      this.blogIntro.page = page;

    }
  }
  toPersianDate(year: number, month: number): string {
    const dt = new Date(year, month);
    return this.persianCalendarService.PersianCalendarMonthYear(dt);
  }
  ngOnDestroy() {
    this.skrollrObj.destroy();
  }
}
