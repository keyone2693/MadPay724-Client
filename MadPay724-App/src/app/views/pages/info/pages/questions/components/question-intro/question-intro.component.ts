import { Component, OnDestroy } from '@angular/core';
import * as skrollr from 'src/assets/wp-content/themes/munza/assets/js/vendor/skrollr.js';
import { StyleScriptService } from 'src/app/core/_services/common/styleScript.service';

@Component({
  selector: 'app-question-intro',
  templateUrl: './question-intro.component.html',
  styleUrls: ['./question-intro.component.css']
})
export class QuestionIntroComponent implements OnDestroy {
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
