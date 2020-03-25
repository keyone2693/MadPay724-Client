import { Component, OnInit, OnDestroy } from '@angular/core';
import { StyleScriptService } from 'src/app/core/_services/common/styleScript.service';

@Component({
  selector: 'app-blog-directory',
  templateUrl: './blog-directory.component.html',
  styleUrls: ['./blog-directory.component.css']
})
export class BlogDirectoryComponent implements OnDestroy, OnInit {
  constructor(private styleService: StyleScriptService) {
  }
  ngOnInit() {
    this.styleService.addStyle("blog-dir", '../../../../../../assets/wp-content/themes/munza/assets/css/pages/blog-dir.css');
  }
  ngOnDestroy() {
    this.styleService.removeStyle("blog-dir");
  }

}
