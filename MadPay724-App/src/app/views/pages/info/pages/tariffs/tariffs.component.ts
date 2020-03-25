import { Component, OnInit, OnDestroy } from '@angular/core';
import { StyleScriptService } from 'src/app/core/_services/common/styleScript.service';

@Component({
  selector: 'app-tariffs',
  templateUrl: './tariffs.component.html',
  styleUrls: ['./tariffs.component.css']
})
export class TariffsComponent implements OnDestroy, OnInit {
  constructor(private styleService: StyleScriptService) {
  }
  ngOnInit() {
    this.styleService.addStyle("tariffs", '../../../../../../assets/wp-content/themes/munza/assets/css/pages/tariffs.css');
  }
  ngOnDestroy() {
    this.styleService.removeStyle("tariffs");
  }

}
