import { Component, OnInit, Input } from '@angular/core';
import { Blog } from 'src/app/data/models/blog/blog';

@Component({
  selector: 'app-last-blog',
  templateUrl: './last-blog.component.html',
  styleUrls: ['./last-blog.component.css']
})
export class LastBlogComponent implements OnInit {
  @Input() blogs: Blog[];
  constructor() { }

  ngOnInit() {

  }

}
