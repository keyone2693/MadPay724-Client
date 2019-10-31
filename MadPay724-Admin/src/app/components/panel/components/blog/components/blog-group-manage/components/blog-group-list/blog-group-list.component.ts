import {  OnInit, ViewChild, Component } from '@angular/core';
import { BlogGroup } from 'src/app/models/blog/blogGroup';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { BlogGroupService } from 'src/app/Services/panel/blog/blogGroup.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth/auth.service';

@Component({
  selector: 'app-blog-group-list',
  templateUrl: './blog-group-list.component.html',
  styleUrls: ['./blog-group-list.component.css']
})
export class BlogGroupListComponent implements OnInit {

 

  blogGroups: MatTableDataSource<BlogGroup>;
  displayedColumns: string[] = ['id', 'name', 'price', 'actions'];
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  searchKey: string;
  loadingHideFlag = false;
  noContentHideFlag = true;
  constructor(private easypayService: BlogGroupService, private authService: AuthService,
    private router: Router,
    private alertService: ToastrService) { }

  ngOnInit() {
    this.loadBlogGroups();
  }
  loadBlogGroups() {
    this.easypayService.getBlogGroups(this.authService.decodedToken.nameid).subscribe((data) => {
      this.blogGroups = new MatTableDataSource(data);
      this.blogGroups.sort = this.sort;
      this.blogGroups.paginator = this.paginator;
      this.loadingHideFlag = true;
      if (data.length === 0) {
        this.noContentHideFlag = false;
      }
    }, error => {
      this.alertService.error(error, 'خطا');
      this.loadingHideFlag = false;
    }
    );
  }
  onSearchClear() {
    this.searchKey = '';
    this.applyFilter();
  }
  applyFilter() {
    if (this.blogGroups === null || this.blogGroups === undefined) {
      this.alertService.error(' برای دسترسی به این بخش باید مدارک شما ارسال و تایید شده باشد '
        + ' برای بررسی مدارک به '
        + ' صفحه ارسال '
        + ' مراجعه کنید !!! ', 'توجه');
    } else {
      this.blogGroups.filter = this.searchKey.trim();
    }
  }
  onCreate() {
    if (this.blogGroups === null || this.blogGroups === undefined) {
      this.alertService.error(' برای دسترسی به این بخش باید مدارک شما ارسال و تایید شده باشد '
        + ' برای بررسی مدارک به '
        + ' صفحه ارسال '
        + ' مراجعه کنید !!! ', 'توجه');
    } else {
      this.router.navigate(['/panel/user/easypay/add']);
    }
  }
  onDelete(easypay: BlogGroup) {
    this.easypayService.deleteBlogGroup(this.authService.decodedToken.nameid, easypay.id).subscribe(() => {
      this.alertService.success('ایزی پی مورد نظر ب موفقیت حذف شد', 'موفق');
      this.blogGroups.data.splice(this.blogGroups.data.indexOf(easypay), 1);
      this.blogGroups._updateChangeSubscription();
    }, error => {
      this.alertService.error(error, 'خطا در حذف ایزی پی');
    });
  }


}
