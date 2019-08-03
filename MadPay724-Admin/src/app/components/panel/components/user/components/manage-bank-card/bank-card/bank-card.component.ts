import { Component, OnInit, Input } from '@angular/core';
import { BankCard } from 'src/app/models/bankcard';

@Component({
  selector: 'app-bank-card',
  templateUrl: './bank-card.component.html',
  styleUrls: ['./bank-card.component.css']
})
export class BankCardComponent implements OnInit {
@Input() bankcard: BankCard;
approve: boolean;
  constructor() { }

  ngOnInit() {
    this.approve = true;
  }

}
