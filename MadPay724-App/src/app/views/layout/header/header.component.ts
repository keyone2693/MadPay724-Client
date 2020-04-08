import { Component, AfterViewInit, OnInit, OnDestroy } from '@angular/core';
import { StyleScriptService } from 'src/app/core/_services/common/styleScript.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnDestroy {
  constructor(private styleService: StyleScriptService) {

    this.styleService.addScript("slidingbar", './assets/wp-content/themes/munza/assets/js/vendor/slidingbar.js');

  }
  ngOnDestroy() {
    this.styleService.removeScript("slidingbar");

  }
}