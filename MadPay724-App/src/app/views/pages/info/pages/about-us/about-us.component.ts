import { Component, OnDestroy } from '@angular/core';
import { StyleScriptService } from 'src/app/core/_services/common/styleScript.service';
import { SeoService } from 'src/app/core/_services/common/seo.service';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent implements OnDestroy {
  constructor(private styleService: StyleScriptService,
    private seoService: SeoService) {
    //Tags
    this.seoService.generateTags({
      title: 'درباره ما | درباره ی مادپی 724',
      url: '/info/aboutus',
    });
    const aboutusUrl = '../../../../../../assets/wp-content/themes/munza/assets/css/pages/aboutus.css';
    this.styleService.addStyle("aboutus", aboutusUrl);
  }

  ngOnDestroy() {
    this.styleService.removeStyle("aboutus");
  }
}
