import { Component, OnInit, Input } from '@angular/core';
import { Wallet } from 'src/app/data/models/wallet';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { WalletIncInventoryComponent } from '../wallet-inc-inventory/wallet-inc-inventory.component';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css']
})
export class WalletComponent implements OnInit {
  @Input() wallet: Wallet;
  approve: boolean;
  constructor(private dialog: MatDialog) { }

  ngOnInit() {
    this.approve = true;
  }
  onInc() {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.data = this.wallet;
    const dialogRef = this.dialog.open(WalletIncInventoryComponent, dialogConfig);
  }
}
