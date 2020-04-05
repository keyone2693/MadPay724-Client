import { Component, OnDestroy } from '@angular/core';
import { StyleScriptService } from 'src/app/core/_services/common/styleScript.service';
import { SeoService } from 'src/app/core/_services/common/seo.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnDestroy {
  constructor(private styleService: StyleScriptService,
    private seoService: SeoService) {
    //Tags
    this.seoService.generateTags({
      title: 'تماس با ما | تماس با مادپی 724',
      url: '/info/contactus',
    });
    const contactusUrl = '../../../../../../assets/wp-content/themes/munza/assets/css/pages/contactus.css';
    this.styleService.addStyle("contactus", contactusUrl);
  }

  ngOnDestroy() {
    this.styleService.removeStyle("contactus");
  }
}
