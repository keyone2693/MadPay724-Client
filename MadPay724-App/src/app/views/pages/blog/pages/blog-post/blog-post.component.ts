import { Component, OnInit, OnDestroy } from '@angular/core';
import { StyleScriptService } from 'src/app/core/_services/common/styleScript.service';


@Component({
  selector: 'app-blog-post',
  templateUrl: './blog-post.component.html',
  styleUrls: ['./blog-post.component.css']
})
export class BlogPostComponent implements OnDestroy, OnInit {
  constructor(private styleService: StyleScriptService) {
  }
  ngOnInit() {
    this.styleService.addStyle("blog-dir", '../../../../../../assets/wp-content/themes/munza/assets/css/pages/blog-dir.css');
  }
  ngOnDestroy() {
    this.styleService.removeStyle("blog-dir");

  }


}
