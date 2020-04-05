import { Component, OnDestroy, OnInit } from '@angular/core';
import { StyleScriptService } from 'src/app/core/_services/common/styleScript.service';
import { SeoService } from 'src/app/core/_services/common/seo.service';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnDestroy, OnInit {
  constructor(private styleService: StyleScriptService,
    private seoService: SeoService) {
    //Tags
    this.seoService.generateTags({
      title: 'سوالات متداول | پرسش و پاسخ',
      url: '/info/questions',
    });
  }
  ngOnInit() {
    this.styleService.addScript("vc-accordion", '../../../../../../assets/wp-content/plugins/js_composer/assets/lib/vc_accordion/vc-accordion.mine23c.js');
    this.styleService.addStyle("contactus", '../../../../../../assets/wp-content/themes/munza/assets/css/pages/questions.css');
    this.styleService.addStyle("js-composer", '../../../../../../assets/wp-content/plugins/js_composer/assets/css/js_composer_tta.mine23c.css');
  }
  ngOnDestroy() {
    this.styleService.removeStyle("contactus");
    this.styleService.removeStyle("js-composer");
    this.styleService.removeScript("vc-accordion");
  }

}
