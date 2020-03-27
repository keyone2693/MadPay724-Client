import { Component, OnInit, OnDestroy } from '@angular/core';
import { StyleScriptService } from 'src/app/core/_services/common/styleScript.service';
import { Title } from '@angular/platform-browser';
import { BlogPost } from 'src/app/data/models/blog/blogPost';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-blog-post',
  templateUrl: './blog-post.component.html',
  styleUrls: ['./blog-post.component.css']
})
export class BlogPostComponent implements OnDestroy, OnInit {
  subManager = new Subscription();
  blogPostData: BlogPost;
  
  constructor(private styleService: StyleScriptService,
    private route: ActivatedRoute, private router: Router,
   private alertService: ToastrService,private title:Title) {
  }
  ngOnInit() {
    this.styleService.addStyle("blog-dir", '../../../../../../assets/wp-content/themes/munza/assets/css/pages/blog-dir.css');
    this.loadBlogPostData();
    this.title.setTitle(this.blogPostData.blog.title);
  }
  loadBlogPostData() {
    this.subManager.add(
      this.route.data.subscribe(data => {
        this.blogPostData = data.blogPostData.result;
      })
    );
  }
  ngOnDestroy() {
    this.styleService.removeStyle("blog-dir");

  }


}
