
import { Component, OnDestroy } from '@angular/core';
import { StyleScriptService } from 'src/app/core/_services/common/styleScript.service';
import { SeoService } from 'src/app/core/_services/common/seo.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnDestroy {

  constructor(private styleService: StyleScriptService, private seoService: SeoService) {
    const maincssUrl = '../../../../assets/wp-content/themes/munza/assets/css/pages/main-home.css';
    this.styleService.addStyle('main-home', maincssUrl);
    //Tags
    this.seoService.generateTags({});
   }

  ngOnDestroy() {
    this.styleService.removeStyle('main-home');
  }


}
