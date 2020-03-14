import { Component, OnInit, Input } from '@angular/core';
import { Wallet } from 'src/app/data/models/wallet';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css']
})
export class WalletComponent implements OnInit {
  @Input() wallet: Wallet;
  approve: boolean;
  constructor() { }

  ngOnInit() {
    this.approve = true;
  }

}
