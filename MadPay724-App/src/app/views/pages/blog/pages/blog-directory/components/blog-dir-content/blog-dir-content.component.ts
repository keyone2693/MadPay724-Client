import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { BlogDirectoryData } from 'src/app/data/models/blog/blogDirectoryData';

@Component({
  selector: 'app-blog-dir-content',
  templateUrl: './blog-dir-content.component.html',
  styleUrls: ['./blog-dir-content.component.css']
})
export class BlogDirContentComponent implements OnInit {
  @Input() blogDirData: BlogDirectoryData;
  @Output() onPageChange: EventEmitter<number> = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
    console.log(this.blogDirData.blogs.pagination.currentPage);
  }
  getCurrentPage(page: number):number {
    return page + 1;
  }

  pageChanged(page: number) {
    this.onPageChange.emit(page);
  }

}
