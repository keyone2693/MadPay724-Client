import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Wallet } from 'src/app/models/wallet';
import { WalletService } from 'src/app/Services/panel/user/wallet.service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { WalletFormComponent } from '../wallet-form/wallet-form.component';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css']
})
export class WalletComponent implements OnInit {
  @Input() wallet: Wallet;
  @Output() deleteWallet = new EventEmitter<Wallet>();
  approve: boolean;
  constructor() { }

  ngOnInit() {
    this.approve = true;
  }

}
