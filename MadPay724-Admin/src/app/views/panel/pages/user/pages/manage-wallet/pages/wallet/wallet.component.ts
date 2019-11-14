import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { WalletFormComponent } from '../wallet-form/wallet-form.component';
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
