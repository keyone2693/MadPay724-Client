import { Component, OnInit, OnDestroy } from '@angular/core';
import { StyleScriptService } from 'src/app/core/_services/common/styleScript.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnDestroy, OnInit {
  constructor(private styleService: StyleScriptService) {
  }
  ngOnInit() {
    this.styleService.addScript("home-js", '../../../../../../assets/wp-content/plugins/munza-core/assets/front/js/newscript.js');
  }
  ngOnDestroy() {
    this.styleService.removeScript("home-js");

  }

}
