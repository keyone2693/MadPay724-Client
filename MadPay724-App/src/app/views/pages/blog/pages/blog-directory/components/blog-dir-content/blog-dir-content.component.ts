import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { BlogDirectoryData } from 'src/app/data/models/blog/blogDirectoryData';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import 'src/app/shared/extentions/string.extentions';

@Component({
  selector: 'app-blog-dir-content',
  templateUrl: './blog-dir-content.component.html',
  styleUrls: ['./blog-dir-content.component.css']
})
export class BlogDirContentComponent implements OnInit, OnDestroy {
  @Input() blogDirData: BlogDirectoryData;
  subManager = new Subscription();

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {

  }
  getCurrentPage(page: number): number {
    return page + 1;
  }

  pageChanged(page: number) {
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
      this.router.navigate(['/blog/page', page]);

    } else if (urls.path === 'search') {
      const filter = params['filter'];
      this.router.navigate(['/blog/search', filter.toSeoString(), 'page', page]);

    } else if (urls.path === 'group') {
      const groupName = params['name'];
      this.router.navigate(['/blog/group', groupName.toSeoString(), 'page', page]);

    } else if (urls.path === 'date') {
      const year = params['year'];
      const month = params['month'];
      this.router.navigate(['/blog/date/year', year, 'month', month, 'page', page]);

    }
  }
  ngOnDestroy() {
    this.subManager.unsubscribe();
  }
}
