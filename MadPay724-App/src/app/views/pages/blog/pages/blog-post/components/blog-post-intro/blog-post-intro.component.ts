import { Component, OnDestroy, Input } from '@angular/core';
import { StyleScriptService } from 'src/app/core/_services/common/styleScript.service';
import * as skrollr from 'src/assets/wp-content/themes/munza/assets/js/vendor/skrollr.js';
import { Blog } from 'src/app/data/models/blog/blog';
import 'src/app/shared/extentions/string.extentions';

@Component({
  selector: 'app-blog-post-intro',
  templateUrl: './blog-post-intro.component.html',
  styleUrls: ['./blog-post-intro.component.css']
})
export class BlogPostIntroComponent implements OnDestroy {
  @Input() blog: Blog;
  skrollrObj: any;
  constructor(private styleService: StyleScriptService) {
  }
  ngOnInit() {
    this.skrollrObj = skrollr.init({
      smoothScrolling: true,
      mobileDeceleration: 0.004,
      forceHeight: false
    });
  }
  ngOnDestroy() {
    this.skrollrObj.destroy();
  }

}
