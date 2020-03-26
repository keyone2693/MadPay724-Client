import { Component, OnInit, OnDestroy } from '@angular/core';
import { StyleScriptService } from 'src/app/core/_services/common/styleScript.service';
import { HomeData } from 'src/app/data/models/home/homeData';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApiReturn } from 'src/app/data/models/common/apiReturn';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnDestroy, OnInit {
  subManager = new Subscription();
  homeData: HomeData;
  constructor(private styleService: StyleScriptService, private route: ActivatedRoute) {
  }
  ngOnInit() {
    this.styleService.addScript("home-js", '../../../../../../assets/wp-content/plugins/munza-core/assets/front/js/newscript.js');
    this.loadHomeData();
  }
  loadHomeData() {
    this.subManager.add(
      this.route.data.subscribe(data=> {
        this.homeData = data.homeData.result;
      })
    );
  }
  ngOnDestroy() {
    this.styleService.removeScript("home-js");
    this.subManager.unsubscribe();
  }

}
