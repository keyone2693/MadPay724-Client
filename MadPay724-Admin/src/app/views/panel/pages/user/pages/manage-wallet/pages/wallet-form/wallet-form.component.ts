import { Component, OnInit, EventEmitter, Output, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Wallet } from 'src/app/data/models/wallet';
import { WalletService } from 'src/app/core/_services/panel/user/wallet.service';

@Component({
  selector: 'app-wallet-form',
  templateUrl: './wallet-form.component.html',
  styleUrls: ['./wallet-form.component.css']
})
export class WalletFormComponent implements OnInit {

  @Output() newWallet = new EventEmitter<Wallet>();
  wallets: Wallet[];
  constructor( public walletService: WalletService,
              private alertService: ToastrService, private matdialogRef: MatDialogRef<WalletFormComponent>,
              private router: Router, @Inject(MAT_DIALOG_DATA) private data: Wallet[]) { }

  ngOnInit() {
    this.wallets = this.data;
  }

  onClear() {
    this.walletService.walletForm.reset();
    this.matdialogRef.close();
  }
  onSubmitAdd() {
    if (this.walletService.walletForm.valid) {
      this.walletService.addWallet(this.walletService.walletForm.value).subscribe((data) => {
        this.alertService.success('کیف پول شما با موفقیت ثبت شد', 'موفق');
        this.onClear();
        this.newWallet.emit(data);
      }, error => {
        this.alertService.error(error, 'خطا در ثبت کیف پول جدید');
      });
    } else {
      this.alertService.warning('اطلاعات کیف پول را به درستی وارد کنید', 'خطا');
    }
  }
}
