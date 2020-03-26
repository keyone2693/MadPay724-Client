import { Component, OnInit, Input } from '@angular/core';
import { ServiceStat } from 'src/app/data/models/home/serviceStat';

@Component({
  selector: 'app-know-info',
  templateUrl: './know-info.component.html',
  styleUrls: ['./know-info.component.css']
})
export class KnowInfoComponent implements OnInit {
  @Input() serviceStat: ServiceStat;
  constructor() { }

  ngOnInit() {
  }

}
