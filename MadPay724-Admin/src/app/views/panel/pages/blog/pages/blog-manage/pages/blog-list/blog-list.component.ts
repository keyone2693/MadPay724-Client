import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Blog } from 'src/app/data/models/blog/blog';
import { BlogService } from 'src/app/core/_services/panel/blog/blog.service';
import { AuthService } from 'src/app/core/_services/auth/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Pagination } from 'src/app/data/models/common/pagination';
import { FilterSortOrderBy } from 'src/app/data/models/common/filterSortOrderBy';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css']
})
export class BlogListComponent implements OnInit, OnDestroy {
  subManager = new Subscription();
  blogs: MatTableDataSource<Blog>;
  blogsArray: Blog[];
  pagination: Pagination;
  displayedColumns: string[] = ['id', 'blogGroupName', 'picAddress', 'title',
    'status', 'isSelected', 'viewCount', 'dateModified', 'actions'];
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  filterSortOrderBy: FilterSortOrderBy = {
    sortDirection:'',
    sortHeader:'',
    searchKey:''
  };

  loadingHideFlag = false;
  noContentHideFlag = true;
  constructor(private blogService: BlogService, private authService: AuthService,
    private router: Router, private route: ActivatedRoute,
    private alertService: ToastrService) { }

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
      this.blogService.getBlogs(this.authService.decodedToken.nameid,
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
      this.blogService.getBlogs(this.authService.decodedToken.nameid,
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
      this.blogService.deleteBlog(this.authService.decodedToken.nameid, blog.id).subscribe(() => {
        this.alertService.success('دسته بندی بلاگ مورد نظر با موفقیت حذف شد', 'موفق');
        this.blogs.data.splice(this.blogs.data.indexOf(blog), 1);
        this.blogs._updateChangeSubscription();
      }, error => {
        this.alertService.error(error, 'خطا در حذف دسته بندی بلاگ');
      })
    );

  }

}
