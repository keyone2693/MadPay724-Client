import { Component, OnInit } from '@angular/core';
import { BankCardsService } from 'src/app/Services/panel/user/bankCards.service';

@Component({
  selector: 'app-edit-bank-card',
  templateUrl: './edit-bank-card.component.html',
  styleUrls: ['./edit-bank-card.component.css']
})
export class EditBankCardComponent implements OnInit {

  constructor(public bankCardService: BankCardsService) { }

  ngOnInit() {
  }

}
