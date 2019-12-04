import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { Subscription } from 'rxjs';
import { WalletService } from 'src/app/core/_services/panel/user/wallet.service';
import { Wallet } from 'src/app/data/models/wallet';
import { WalletFormComponent } from './pages/wallet-form/wallet-form.component';

@Component({
  selector: 'app-manage-wallet',
  templateUrl: './manage-wallet.component.html',
  styleUrls: ['./manage-wallet.component.css']
})
export class ManageWalletComponent implements OnInit, OnDestroy {
  wallets: Wallet[];
  subManager = new Subscription();
  constructor(private dialog: MatDialog, private route: ActivatedRoute, private alertService: ToastrService,
              private walletService: WalletService) { }

  ngOnInit() {
    this.loadWallets();
  }
  ngOnDestroy() {
    this.subManager.unsubscribe();
  }
  loadWallets() {
    this.route.data.subscribe(data => {
      this.wallets = data.wallets;
    });
  }
  onCreate() {
    if (this.wallets === null || this.wallets === undefined) {
      this.alertService.error(' برای دسترسی به این بخش باید مدارک شما ارسال و تایید شده باشد '
        + ' برای بررسی مدارک به '
        + ' صفحه ارسال '
        + ' مراجعه کنید !!! ', 'توجه');
    } else {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.data = this.wallets;
      const dialogRef = this.dialog.open(WalletFormComponent, dialogConfig);
      const sub = dialogRef.componentInstance.newWallet.subscribe((data) => {
        // this.insertWallet(data);
        this.refreshWallets();
      });
      dialogRef.afterClosed().subscribe(() => {
        sub.unsubscribe();
      });
    }
  }
  refreshWallets() {
    this.subManager.add(
      this.walletService.getWallets().subscribe((data) => {
        this.wallets = data;
      })
    );
  }

  insertWallet(wallet: Wallet) {
    this.wallets.push(wallet);
  }
}
