import { Component, OnInit } from '@angular/core';
import { EasyPay } from 'src/app/models/user/easyPay';
import { Wallet } from 'src/app/models/wallet';
import { WalletService } from 'src/app/Services/panel/user/wallet.service';
import { AuthService } from 'src/app/Services/auth/auth.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-easypay-list',
  templateUrl: './easypay-list.component.html',
  styleUrls: ['./easypay-list.component.css']
})
export class EasypayListComponent implements OnInit {
  easyPays: Wallet[];
  displayedColumns: string[] = ['name', 'price', 'connect', 'action'];

  constructor(private gs: WalletService, private authService: AuthService) { }

  ngOnInit() {
    this.gs.getWallets(this.authService.decodedToken.nameid).subscribe((data) => {
      this.easyPays = data;
    }, error => {
      console.log(error);
    }
    );
  }

}
