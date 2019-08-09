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
  constructor(private walletSercise: WalletService, private dialog: MatDialog, private alertService: ToastrService) { }

  ngOnInit() {
    this.approve = true;
  }

  onEdit(wallet: Wallet) {
    this.walletSercise.populateForm(wallet);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    const dialogRef = this.dialog.open(WalletFormComponent, dialogConfig);

    const sub = dialogRef.componentInstance.updateWallet.subscribe((data) => {
      this.updateWallet(data);
    });
    dialogRef.afterClosed().subscribe(() => {
      sub.unsubscribe();
    });

  }
  onDelete(wallet: Wallet) {
    if (confirm('آیا از حذف این کارت مطمن هستید ؟')) {
      this.walletSercise.deleteWallet(wallet.id).subscribe(() => {
        this.alertService.success('کارت بانکی شما با موفقیت حذف شد', 'موفق');
        this.deleteWallet.emit(wallet);
      }, error => {
        this.alertService.error(error, 'خطا در حذف کارت جدید');
      });
    }

}
updateWallet(wallet: Wallet) {
  this.wallet = wallet;
}


}
