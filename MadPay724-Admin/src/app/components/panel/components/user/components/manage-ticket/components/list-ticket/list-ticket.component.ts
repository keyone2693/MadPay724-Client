import { Component, OnInit } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { NgxUiLoaderModule, NgxUiLoaderConfig, POSITION, SPINNER, PB_DIRECTION } from 'ngx-ui-loader';

@Component({
  selector: 'app-list-ticket',
  templateUrl: './list-ticket.component.html',
  styleUrls: ['./list-ticket.component.css']
})
export class ListTicketComponent implements OnInit {
  loaders: any;
  constructor(private ngxService: NgxUiLoaderService) {
    this.loaders = {
        pbColor: '#ff4444',
        bgsColor: '#ff4444',
        bgsPosition: POSITION.bottomCenter,
        bgsSize: 70,
        fgsPosition: POSITION.bottomCenter,
        fgsSize: 70,
        fgsColor: '#ff4444',
        bgsType: SPINNER.threeBounce,
        fgsType: SPINNER.threeBounce,
        pbDirection: PB_DIRECTION.rightToLeft,
        pbThickness: 3,
        overlayColor: 'rgba(40,40,40,0)'
      };
  }

  ngOnInit() {
    this.ngxService.startLoader('loader-01');
  }

}
