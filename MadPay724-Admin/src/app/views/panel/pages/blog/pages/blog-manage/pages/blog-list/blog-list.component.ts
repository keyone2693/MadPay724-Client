import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { Blog } from 'src/app/data/models/blog/blog';
import { BlogService } from 'src/app/core/_services/panel/blog/blog.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Pagination } from 'src/app/data/models/common/pagination';
import { FilterSortOrderBy } from 'src/app/data/models/common/filterSortOrderBy';
import * as fromStore from 'src/app/store';
import { Store } from '@ngrx/store';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css']
})
export class BlogListComponent implements OnInit, OnDestroy {
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  subManager = new Subscription();
  blogs: MatTableDataSource<Blog>;
  blogsArray: Blog[];
  pagination: Pagination;
  displayedColumns: string[] = ['id', 'blogGroupName', 'picAddress', 'title',
    'status', 'isSelected', 'viewCount', 'dateModified', 'actions'];

  filterSortOrderBy: FilterSortOrderBy = {
    sortDirection: '',
    sortHeader: '',
    searchKey: ''
  };

  loadingHideFlag = false;
  noContentHideFlag = true;
  constructor(private blogService: BlogService,
    private router: Router, private route: ActivatedRoute,
    private alertService: ToastrService, private store: Store<fromStore.State>) { }

  ngOnInit() {
    this.loadBlogs();
  }
  ngOnDestroy() {
    this.subManager.unsubscribe();
  }
  loadBlogs() {
    this.route.data.subscribe(data => {
      this.blogs = new MatTableDataSource(data.blogs.result);
      this.pagination = data.blogs.pagination;
      this.blogsArray = data.blogs.result;
      this.blogs.sort = this.sort;
      this.loadingHideFlag = true;
      if (data.blogs.result.length === 0) {
        this.noContentHideFlag = false;
      }
    });

  }
  paginatorEvent(filter: any) {

    let { searchKey, sortDirection, sortHeader } = this.filterSortOrderBy;

    if (searchKey === undefined || searchKey == null) {
      searchKey = '';
    }
    if (sortDirection === undefined || sortDirection == null) {
      sortDirection = '';
    }
    if (sortHeader === undefined || sortHeader == null) {
      sortHeader = '';
    }
    this.subManager.add(
      this.blogService.getBlogs(
        filter.pageIndex, filter.pageSize,
        searchKey.trim(), sortHeader, sortDirection)
        .subscribe((data) => {
          this.blogs = new MatTableDataSource(data.result);
          this.pagination = data.pagination;
          this.blogsArray = data.result;
          this.blogs.sort = this.sort;
        }, error => {
            this.alertService.error(error);
        })
    )
  }
  sortDataEvent(sort: any) {
    this.filterSortOrderBy.sortHeader = sort.active;
    this.filterSortOrderBy.sortDirection = sort.direction;
    this.applyFilter();
  }
  onSearchClear() {
    this.filterSortOrderBy.searchKey = '';
    this.applyFilter();
  }
  applyFilter() {
    let { searchKey, sortDirection, sortHeader } = this.filterSortOrderBy;
    if (searchKey === undefined || searchKey == null) {
      searchKey = '';
    }
    if (sortDirection === undefined || sortDirection == null) {
      sortDirection = '';
    }
    if (sortHeader === undefined || sortHeader == null) {
      sortHeader = '';
    }
    this.subManager.add(
      this.blogService.getBlogs(
        this.pagination.currentPage, this.pagination.itemsPerPage,
        searchKey.trim(), sortHeader, sortDirection)
        .subscribe((data) => {
          this.blogs = new MatTableDataSource(data.result);
          this.pagination = data.pagination;
          this.blogsArray = data.result;
          this.blogs.sort = this.sort;
        }, error => {
          this.alertService.error(error);
        })
    )
  }
  onCreate() {
    this.router.navigate(['/panel/blog/blog/add']);
  }
  onDelete(blog: Blog) {
    this.subManager.add(
      this.blogService.deleteBlog(blog.id).subscribe(() => {
        this.alertService.success('دسته بندی بلاگ مورد نظر با موفقیت حذف شد', 'موفق');
        this.blogs.data.splice(this.blogs.data.indexOf(blog), 1);
        this.blogs._updateChangeSubscription();
      }, error => {
        this.alertService.error(error, 'خطا در حذف دسته بندی بلاگ');
      })
    );

  }
  onApproveChange(event: any,blogId: string) {
    this.subManager.add(
      this.blogService.approveBlog(event.checked, blogId)
        .subscribe(() => {
          if (event.checked === true) {
            this.store.dispatch(new fromStore.DecUnverifiedBlogCount());
            this.alertService.success('بلاگ مورد نظر با موفقیت تایید شد', 'موفق');
          } else {
            this.store.dispatch(new fromStore.IncUnverifiedBlogCount());
            this.alertService.success('بلاگ شما با موفقیت از حالت تاییدی خارج شد', 'موفق');
          }
        }, error => {
          this.alertService.error(error);
        })
    )
  }
  onSelectChange(event: any, blogId: string) {
    this.subManager.add(
      this.blogService.selectBlog(event.checked, blogId)
        .subscribe(() => {
          if (event.checked === true) {
            this.alertService.success('بلاگ مورد نظر با موفقیت محبوب شد', 'موفق');
          } else {
            this.alertService.success('بلاگ شما با موفقیت از حالت محبوبی خارج شد', 'موفق');
          }
        }, error => {
            this.alertService.error(error);
        })
    );
  }
}
