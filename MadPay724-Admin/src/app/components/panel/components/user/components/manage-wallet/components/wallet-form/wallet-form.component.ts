import { Component, OnInit, EventEmitter, Output, Inject } from '@angular/core';
import { Wallet } from 'src/app/models/wallet';
import { WalletService } from 'src/app/Services/panel/user/wallet.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/Services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-wallet-form',
  templateUrl: './wallet-form.component.html',
  styleUrls: ['./wallet-form.component.css']
})
export class WalletFormComponent implements OnInit {

  @Output() newWallet = new EventEmitter<Wallet>();
  wallets: Wallet[];
  constructor(private authService: AuthService, public walletService: WalletService,
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
      this.walletService.addWallet(this.walletService.walletForm.value, this.authService.decodedToken.nameid).subscribe((data) => {
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
