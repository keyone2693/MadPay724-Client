import { OnInit, ViewChild, Component, OnDestroy } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { BlogGroup } from 'src/app/data/models/blog/blogGroup';
import { BlogGroupService } from 'src/app/core/_services/panel/blog/blogGroup.service';

@Component({
  selector: 'app-blog-group-list',
  templateUrl: './blog-group-list.component.html',
  styleUrls: ['./blog-group-list.component.css']
})
export class BlogGroupListComponent implements OnInit, OnDestroy {
  subManager = new Subscription();
  blogGroups: MatTableDataSource<BlogGroup>;
  blogGroupsArray: BlogGroup[];
  displayedColumns: string[] = ['id', 'name', 'price', 'actions'];
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  searchKey: string;
  loadingHideFlag = false;
  noContentHideFlag = true;
  constructor(private blogGroupService: BlogGroupService,
    private router: Router,
    private alertService: ToastrService) { }

  ngOnInit() {
    this.loadBlogGroups();
  }
  ngOnDestroy() {
    this.subManager.unsubscribe();
  }
  loadBlogGroups() {
    this.subManager.add(
      this.blogGroupService.getBlogGroups().subscribe((data) => {
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
      )
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
    this.subManager.add(
      this.blogGroupService.deleteBlogGroup(blogGroup.id).subscribe(() => {
        this.alertService.success('دسته بندی بلاگ مورد نظر با موفقیت حذف شد', 'موفق');
        this.blogGroups.data.splice(this.blogGroups.data.indexOf(blogGroup), 1);
        this.blogGroups._updateChangeSubscription();
      }, error => {
        this.alertService.error(error, 'خطا در حذف دسته بندی بلاگ');
      })
    );

  }


}
