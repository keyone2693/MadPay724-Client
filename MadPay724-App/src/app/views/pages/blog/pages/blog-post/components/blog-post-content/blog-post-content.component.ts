import { Component, OnInit, Input } from '@angular/core';
import { BlogPost } from 'src/app/data/models/blog/blogPost';
import 'src/app/shared/extentions/string.extentions';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-blog-post-content',
  templateUrl: './blog-post-content.component.html',
  styleUrls: ['./blog-post-content.component.css']
})
export class BlogPostContentComponent implements OnInit {
  @Input() blogPostData: BlogPost;
  constructor(private alertService:ToastrService) { }

  ngOnInit() {
    this.blogPostData.relatedBlogs
  }
  sendComment() {
    this.alertService.warning('ارسال نظر موقتا غیر فعال میباشد','ناموفق')
  }

}
