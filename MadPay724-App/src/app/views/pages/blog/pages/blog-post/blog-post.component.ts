import { Component, OnInit, OnDestroy } from '@angular/core';
import { StyleScriptService } from 'src/app/core/_services/common/styleScript.service';
import { Title } from '@angular/platform-browser';
import { BlogPost } from 'src/app/data/models/blog/blogPost';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { filter } from 'rxjs/operators';
import { SeoService } from 'src/app/core/_services/common/seo.service';
import 'src/app/shared/extentions/string.extentions';


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
    private alertService: ToastrService, private title: Title,
    private seoService: SeoService) {
    this.subManager.add(
      router.events.pipe(
        filter(event => event instanceof NavigationEnd)
      ).subscribe((event: NavigationEnd) => {
        this.loadScript();
      })
    );
  }
  ngOnInit() {
    this.styleService.addStyle("blog-dir", './assets/wp-content/themes/munza/assets/css/pages/blog-dir.css');

    this.loadBlogPostData();

    //Tags
    this.seoService.generateTags({
      title: this.blogPostData.blog.title,
      description: this.blogPostData.blog.summerText,
      keywords: this.blogPostData.blog.tags,
      image: this.blogPostData.blog.picAddress,
      url: '/blog/post/' + this.blogPostData.blog.id + '/' + this.blogPostData.blog.title.toSeoString() ,
    });
    this.title.setTitle(this.blogPostData.blog.title);
  }
  loadScript() {

    this.styleService.removeScript("slidingbar");
    this.styleService.addScript("slidingbar", './assets/wp-content/themes/munza/assets/js/vendor/slidingbar.js');

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
    this.styleService.removeScript("side-bar");

  }


}
