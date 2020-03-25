
import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { StyleService } from 'src/app/core/_services/common/style.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnDestroy {

  constructor(private styleService: StyleService) {
    const maincssUrl = '../../../../assets/wp-content/themes/munza/assets/css/pages/main-home.css';
    this.styleService.addStyle('main-home', maincssUrl);
   }

  ngOnDestroy() {
    this.styleService.removeStyle('main-home');
  }


}
