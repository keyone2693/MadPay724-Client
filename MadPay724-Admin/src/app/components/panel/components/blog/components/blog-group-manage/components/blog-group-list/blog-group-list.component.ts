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
  blogGroupsArray: BlogGroup[];
  displayedColumns: string[] = ['id', 'name', 'price', 'actions'];
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  searchKey: string;
  loadingHideFlag = false;
  noContentHideFlag = true;
  constructor(private blogGroupService: BlogGroupService, private authService: AuthService,
              private router: Router,
              private alertService: ToastrService) { }

  ngOnInit() {
    this.loadBlogGroups();
  }
  loadBlogGroups() {
    this.blogGroupService.getBlogGroups(this.authService.decodedToken.nameid).subscribe((data) => {
      this.blogGroups = new MatTableDataSource(data);
      this.blogGroupsArray = data;
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
      this.blogGroups.filter = this.searchKey.trim();
  }
  getBlogGroupById(blogGroupId: string): string {
    const bg = this.blogGroupsArray.find(p => p.id === blogGroupId);
    if (bg != null && bg !== undefined) {
      return bg.name;
    } else {
      return 'بدون پرنت';
    }
  }
  onCreate() {
      this.router.navigate(['/panel/blog/bloggroup/add']);
  }
  onDelete(blogGroup: BlogGroup) {
    this.blogGroupService.deleteBlogGroup(this.authService.decodedToken.nameid, blogGroup.id).subscribe(() => {
      this.alertService.success('دسته بندی بلاگ مورد نظر ب موفقیت حذف شد', 'موفق');
      this.blogGroups.data.splice(this.blogGroups.data.indexOf(blogGroup), 1);
      this.blogGroups._updateChangeSubscription();
    }, error => {
      this.alertService.error(error, 'خطا در حذف دسته بندی بلاگ');
    });
  }


}
