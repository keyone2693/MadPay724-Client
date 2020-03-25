import { Component, OnInit, OnDestroy } from '@angular/core';
import * as skrollr from 'src/assets/wp-content/themes/munza/assets/js/vendor/skrollr.js';
import { StyleScriptService } from 'src/app/core/_services/common/styleScript.service';

@Component({
  selector: 'app-blog-dir-intro',
  templateUrl: './blog-dir-intro.component.html',
  styleUrls: ['./blog-dir-intro.component.css']
})
export class BlogDirIntroComponent implements OnDestroy {
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
