import { Component, OnInit, Input } from '@angular/core';
import { BlogPost } from 'src/app/data/models/blog/blogPost';

@Component({
  selector: 'app-blog-post-content',
  templateUrl: './blog-post-content.component.html',
  styleUrls: ['./blog-post-content.component.css']
})
export class BlogPostContentComponent implements OnInit {
  @Input() blogPostData: BlogPost;
  constructor() { }

  ngOnInit() {
  }

}
