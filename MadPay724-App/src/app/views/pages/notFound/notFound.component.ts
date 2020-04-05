import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { StyleScriptService } from 'src/app/core/_services/common/styleScript.service';
import 'src/app/shared/extentions/string.extentions';
import { SeoService } from 'src/app/core/_services/common/seo.service';

@Component({
  selector: 'app-notFound',
  templateUrl: './notFound.component.html',
  styleUrls: ['./notFound.component.css']
})
export class NotFoundComponent implements OnDestroy {
  filter: string = '';
  constructor(private router: Router, private styleService: StyleScriptService,
  private seoService: SeoService) {
    const maincssUrl = '../../../../assets/wp-content/themes/munza/assets/css/pages/not-found.css';
    this.styleService.addStyle('not-found', maincssUrl);
    //Tags
    this.seoService.generateTags({
      title: 'صفحه ی مورد نظر یافت نشد',
      url: '/not-found',
    });
   }

  ngOnInit() {
  }
  goSearch() {
    this.router.navigate(['/blog/search', this.filter.toSeoString(), 'page', 1]);
    this.filter = '';
  }
  ngOnDestroy() {
    this.styleService.removeStyle('not-found');
  }
}
