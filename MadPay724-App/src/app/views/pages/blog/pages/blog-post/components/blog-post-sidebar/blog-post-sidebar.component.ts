import { Component, OnInit, Input } from '@angular/core';
import { BlogPost } from 'src/app/data/models/blog/blogPost';

@Component({
  selector: 'app-blog-post-sidebar',
  templateUrl: './blog-post-sidebar.component.html',
  styleUrls: ['./blog-post-sidebar.component.css']
})
export class BlogPostSidebarComponent implements OnInit {
  @Input() blogPostData: BlogPost;
  constructor() { }

  ngOnInit() {
  }

}
