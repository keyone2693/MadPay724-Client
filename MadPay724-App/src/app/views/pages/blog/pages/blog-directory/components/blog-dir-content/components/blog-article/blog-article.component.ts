import { Component, OnInit, Input } from '@angular/core';
import { Blog } from 'src/app/data/models/blog/blog';
import { Pagination } from 'src/app/data/models/common/pagination';

@Component({
  selector: 'app-blog-article',
  templateUrl: './blog-article.component.html',
  styleUrls: ['./blog-article.component.css']
})
export class BlogArticleComponent implements OnInit {
  @Input() blog: Blog;
  @Input() pagination: Pagination;

  constructor() { }

  ngOnInit() {
  }

}
