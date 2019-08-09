import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Wallet } from 'src/app/models/wallet';
import { WalletService } from 'src/app/Services/panel/user/wallet.service';
import { MatDialogRef } from '@angular/material';
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
  @Output() updateWallet = new EventEmitter<Wallet>();
  wallet: Wallet;
  constructor(private authService: AuthService, public walletService: WalletService,
              private alertService: ToastrService, private matdialogRef: MatDialogRef<WalletFormComponent>,
              private router: Router) {}

  ngOnInit() {
  }

  onClear() {
    this.walletService.walletForm.reset();
    this.matdialogRef.close();
  }
  onSubmitAdd() {
    if (this.walletService.walletForm.valid) {
      this.wallet = Object.assign({}, this.walletService.walletForm.value);
      if (this.addActive()) {

          this.walletService.addWallet(this.wallet, this.authService.decodedToken.nameid).subscribe((data) => {
              this.alertService.success('کارت بانکی شما با موفقیت ثبت شد', 'موفق');
              this.alertService.info('کارت شما در انتظار تایید میباشد', 'توجه');
              this.onClear();
              this.newWallet.emit(data);
            }, error => {
              this.alertService.error(error, 'خطا در ثبت کارت جدید');
            });
      } else {
        this.walletService.updateWallet(this.wallet).subscribe(() => {
            this.alertService.success('کارت بانکی شما با موفقیت ویرایش شد', 'موفق');
            this.alertService.info('کارت شما در انتظار تایید میباشد', 'توجه');
            this.onClear();
            this.updateWallet.emit(this.wallet);
          }, error => {
            this.alertService.error(error, 'خطا در ثبت کارت جدید');
          });
      }
    } else {
      this.alertService.warning('اطلاعات کارت را به درستی وارد کنید', 'خطا');
    }
  }

  addActive(): boolean {
    return (this.walletService.walletForm.get('id').value === null ||
            this.walletService.walletForm.get('id').value === undefined);
  }
}
