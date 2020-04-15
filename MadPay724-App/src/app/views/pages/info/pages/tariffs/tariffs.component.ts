import { Component, OnInit, OnDestroy } from '@angular/core';
import { StyleScriptService } from 'src/app/core/_services/common/styleScript.service';
import { SeoService } from 'src/app/core/_services/common/seo.service';

@Component({
  selector: 'app-tariffs',
  templateUrl: './tariffs.component.html',
  styleUrls: ['./tariffs.component.css']
})
export class TariffsComponent implements OnDestroy, OnInit {
  constructor(private styleService: StyleScriptService,
    private seoService: SeoService) {
    //Tags
    this.seoService.generateTags({
      title: 'تعرفه های استفاده از سرویس ماد پی',
      url: '/info/tariffs',
    });
    this.styleService.addStyle("tariffs", './assets/wp-content/themes/munza/assets/css/pages/tariffs.css');
  }
  ngOnInit() {
  }
  ngOnDestroy() {
    this.styleService.removeStyle("tariffs");
  }

}
