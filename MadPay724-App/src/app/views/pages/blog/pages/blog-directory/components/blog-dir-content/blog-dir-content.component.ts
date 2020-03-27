import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { BlogDirectoryData } from 'src/app/data/models/blog/blogDirectoryData';

@Component({
  selector: 'app-blog-dir-content',
  templateUrl: './blog-dir-content.component.html',
  styleUrls: ['./blog-dir-content.component.css']
})
export class BlogDirContentComponent implements OnInit {
  @Input() blogDirData: BlogDirectoryData;

  constructor() { }

  ngOnInit() {
  }

}
