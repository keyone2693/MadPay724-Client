import { Component, OnInit, OnDestroy } from '@angular/core';
import { Wallet } from 'src/app/models/wallet';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { WalletService } from 'src/app/Services/panel/user/wallet.service';
import { AuthService } from 'src/app/Services/auth/auth.service';
import { WalletFormComponent } from './components/wallet-form/wallet-form.component';
import { take } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-manage-wallet',
  templateUrl: './manage-wallet.component.html',
  styleUrls: ['./manage-wallet.component.css']
})
export class ManageWalletComponent implements OnInit, OnDestroy {
  formTitle: string;
  wallets: Wallet[];
  subManager = new Subscription();
  constructor(private dialog: MatDialog, private route: ActivatedRoute, private alertService: ToastrService,
              private walletService: WalletService,
              private authService: AuthService) { }

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
    this.formTitle = 'افزودن کیف پول جدید';
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
  refreshWallets() {
    this.subManager.add(
      this.walletService.getWallets(this.authService.decodedToken.nameid).subscribe((data) => {
        this.wallets = data;
      })
    );
  }

  insertWallet(wallet: Wallet) {
    this.wallets.push(wallet);
  }
}
