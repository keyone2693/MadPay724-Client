import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { Blog } from 'src/app/data/models/blog/blog';
import { BlogDataSource } from 'src/app/shared/helpers/data-sources/blog.datasource';
import { Store } from '@ngrx/store';

import * as fromBlogStore from '../../store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-blog-dashboard',
  templateUrl: './blog-dashboard.component.html',
  styleUrls: ['./blog-dashboard.component.css']
})
export class BlogDashboardComponent implements OnInit {
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  loading$: Observable<boolean>;
  blogsDataSource: BlogDataSource;
  //dataSourceBlogs: MatTableDataSource<Blog>;
  displayedColumns = ["id", "title", "picAddress"];
  constructor(private store: Store<fromBlogStore.BlogState>) { }

  ngOnInit() {

    this.loading$ = this.store.select(fromBlogStore.getBlogsLoading);

    this.blogsDataSource = new BlogDataSource(this.store);

    const initPage: fromBlogStore.PageQuery = {
      pageIbdex: 0,
      pageSize:1
    }
    this.blogsDataSource.loadBlogs(initPage);
  }
}
