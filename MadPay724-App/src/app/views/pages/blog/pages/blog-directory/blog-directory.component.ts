import { Component, OnInit, OnDestroy } from '@angular/core';
import { StyleScriptService } from 'src/app/core/_services/common/styleScript.service';
import { BlogDirectoryData } from 'src/app/data/models/blog/blogDirectoryData';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogService } from 'src/app/core/_services/blog/blog.service';
import { Pagination } from 'src/app/data/models/common/pagination';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-blog-directory',
  templateUrl: './blog-directory.component.html',
  styleUrls: ['./blog-directory.component.css']
})
export class BlogDirectoryComponent implements OnDestroy, OnInit {
  subManager = new Subscription();
  blogDirData: BlogDirectoryData;
  filter: string = '';
  constructor(private styleService: StyleScriptService,
    private route: ActivatedRoute, private router: Router,
    private blogService: BlogService, private alertService:ToastrService) {
  }
  ngOnInit() {
    //console.log(this.router.);

    this.styleService.addStyle("blog-dir", '../../../../../../assets/wp-content/themes/munza/assets/css/pages/blog-dir.css');
    this.loadBlogDirData();
  }
  loadBlogDirData() {
    this.subManager.add(
      this.route.data.subscribe(data => {
        this.blogDirData = data.blogDirData;
      })
    );
  }
  applyFilter(filterStr: string) {
    if (filterStr) {
      this.filter = filterStr;
    }
    const pagination = this.blogDirData.blogs.pagination;

    this.subManager.add(
      this.blogService.getBlogs(
        pagination.currentPage, pagination.itemsPerPage,
        this.filter).subscribe((data) => {
          this.blogDirData = data;
        }, error => {
            this.alertService.error(error);
        })
    );
  }
  applyPage(page: number) {
    this.blogDirData.blogs.pagination.currentPage = page - 1;
    this.applyFilter('');
  }
  ngOnDestroy() {
    this.styleService.removeStyle("blog-dir");
    this.subManager.unsubscribe();

  }

}
