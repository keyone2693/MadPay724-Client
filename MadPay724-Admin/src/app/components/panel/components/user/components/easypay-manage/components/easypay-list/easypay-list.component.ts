import { Component, OnInit, ViewChild } from '@angular/core';
import { EasyPay } from 'src/app/models/user/easyPay';
import { Wallet } from 'src/app/models/wallet';
import { WalletService } from 'src/app/Services/panel/user/wallet.service';
import { AuthService } from 'src/app/Services/auth/auth.service';
import { MatSort, MatTableDataSource, MatPaginator } from '@angular/material';

@Component({
  selector: 'app-easypay-list',
  templateUrl: './easypay-list.component.html',
  styleUrls: ['./easypay-list.component.css']
})
export class EasypayListComponent implements OnInit {
  easyPays: MatTableDataSource<any>;
  displayedColumns: string[] = ['id', 'name', 'code', 'actions'];
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(private gs: WalletService, private authService: AuthService) { }

  ngOnInit() {
    this.gs.getWallets(this.authService.decodedToken.nameid).subscribe((data) => {
      this.easyPays = new MatTableDataSource(data);
      this.easyPays.sort = this.sort;
      this.easyPays.paginator = this.paginator;
    }, error => {
      console.log(error);
    }
    );
  }

}
