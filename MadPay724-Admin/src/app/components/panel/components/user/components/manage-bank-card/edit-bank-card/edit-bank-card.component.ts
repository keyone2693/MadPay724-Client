import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BankCardsService } from 'src/app/Services/panel/user/bankCards.service';
import { BankCard } from 'src/app/models/bankcard';

@Component({
  selector: 'app-edit-bank-card',
  templateUrl: './edit-bank-card.component.html',
  styleUrls: ['./edit-bank-card.component.css']
})
export class EditBankCardComponent implements OnInit {

  @Output() newBankCard = new EventEmitter<BankCard>();

  constructor(public bankCardService: BankCardsService) { }

  ngOnInit() {
  }

  onClear() {
    this.bankCardService.bankcardForm.reset();
  }
  onSubmitAdd() {
    if (this.bankCardService.bankcardForm.valid) {
      this.newBankCard.emit(this.bankCardService.bankcardForm.value);
    }
  }
}
