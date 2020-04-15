import { Component, OnInit, Input } from '@angular/core';
import { Customer } from 'src/app/data/models/home/customer';

@Component({
  selector: 'app-costumer',
  templateUrl: './costumer.component.html',
  styleUrls: ['./costumer.component.css']
})
export class CostumerComponent implements OnInit {
  @Input() customers: Customer[];
  constructor() { }

  ngOnInit() {
  }

}
