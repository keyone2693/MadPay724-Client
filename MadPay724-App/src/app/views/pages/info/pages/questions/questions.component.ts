import { Component, OnDestroy, OnInit } from '@angular/core';
import { StyleScriptService } from 'src/app/core/_services/common/styleScript.service';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnDestroy, OnInit {
  constructor(private styleService: StyleScriptService) {
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
