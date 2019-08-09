import { Component, OnInit } from '@angular/core';
import { Wallet } from 'src/app/models/wallet';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { WalletService } from 'src/app/Services/panel/user/wallet.service';
import { AuthService } from 'src/app/Services/auth/auth.service';
import { WalletFormComponent } from './components/wallet-form/wallet-form.component';

@Component({
  selector: 'app-manage-wallet',
  templateUrl: './manage-wallet.component.html',
  styleUrls: ['./manage-wallet.component.css']
})
export class ManageWalletComponent implements OnInit {
  formTitle: string;
  wallets: Wallet[];
  constructor(private dialog: MatDialog, private route: ActivatedRoute, private alertService: ToastrService,
              private walletService: WalletService,
              private authService: AuthService) {}

  ngOnInit() {
    this.loadWallets();
  }
  loadWallets() {
    this.route.data.subscribe(data => {
      this.wallets = data.wallets;
    });
  }
  onCreate() {
    this.formTitle = 'افزودن کارت بانکی جدید';
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    const dialogRef = this.dialog.open(WalletFormComponent, dialogConfig);
    const sub = dialogRef.componentInstance.newWallet.subscribe((data) => {
      this.insertWallet(data);
    });
    dialogRef.afterClosed().subscribe(() => {
      sub.unsubscribe();
    });

  }
  insertWallet(wallet: Wallet) {
    this.wallets.push({
      id: wallet.id
    });
  }
  removeWallet(wallet: Wallet) {
    this.wallets.splice(this.wallets.indexOf(wallet) , 1);
  }
}
