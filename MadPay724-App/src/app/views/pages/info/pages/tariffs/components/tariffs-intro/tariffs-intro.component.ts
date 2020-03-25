import { Component, OnInit, OnDestroy } from '@angular/core';
import { StyleScriptService } from 'src/app/core/_services/common/styleScript.service';
import * as skrollr from 'src/assets/wp-content/themes/munza/assets/js/vendor/skrollr.js';

@Component({
  selector: 'app-tariffs-intro',
  templateUrl: './tariffs-intro.component.html',
  styleUrls: ['./tariffs-intro.component.css']
})
export class TariffsIntroComponent implements OnDestroy {
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
