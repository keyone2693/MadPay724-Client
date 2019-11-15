import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Blog } from 'src/app/data/models/blog/blog';
import { BlogService } from 'src/app/core/_services/panel/blog/blog.service';
import { AuthService } from 'src/app/core/_services/auth/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css']
})
export class BlogListComponent implements OnInit, OnDestroy {
  subManager = new Subscription();
  blogs: MatTableDataSource<Blog>;
  blogsArray: Blog[];
  displayedColumns: string[] = ['id', 'blogGroupName', 'picAddress', 'title',
    'status', 'isSelected', 'summerText', 'viewCount', 'actions'];
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  searchKey: string;
  loadingHideFlag = false;
  noContentHideFlag = true;
  constructor(private blogService: BlogService, private authService: AuthService,
              private router: Router,
              private alertService: ToastrService) { }

  ngOnInit() {
    this.loadBlogs();
  }
  ngOnDestroy() {
    this.subManager.unsubscribe();
  }
  loadBlogs() {
    this.subManager.add(
      this.blogService.getBlogs(this.authService.decodedToken.nameid).subscribe((data) => {
        this.blogs = new MatTableDataSource(data);
        this.blogsArray = data;
        this.blogs.sort = this.sort;
        this.blogs.paginator = this.paginator;
        this.loadingHideFlag = true;
        if (data.length === 0) {
          this.noContentHideFlag = false;
        }
      }, error => {
        this.alertService.error(error, 'خطا');
        this.loadingHideFlag = false;
      }
      )
    );

  }
  onSearchClear() {
    this.searchKey = '';
    this.applyFilter();
  }
  applyFilter() {
    this.blogs.filter = this.searchKey.trim();
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
