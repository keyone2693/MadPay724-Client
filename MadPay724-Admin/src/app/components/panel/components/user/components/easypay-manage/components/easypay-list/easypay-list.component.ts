import { Component, OnInit, ViewChild } from '@angular/core';
import { EasyPay } from 'src/app/models/user/easyPay';
import { Wallet } from 'src/app/models/wallet';
import { WalletService } from 'src/app/Services/panel/user/wallet.service';
import { AuthService } from 'src/app/Services/auth/auth.service';
import { MatSort, MatTableDataSource, MatPaginator, MatDialog, MatDialogConfig } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { EasyPayService } from 'src/app/Services/panel/user/easyPay.service';
import { EasypayFormComponent } from '../easypay-form/easypay-form.component';
import { GatesService } from 'src/app/Services/panel/user/gateService.service';
import { GatesWallets } from 'src/app/models/user/gatesWallets';

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
  searchKey: string;
  formTitle: string;
  loadingHideFlag = true;
  noContentHideFlag = false;
  constructor(private easypayService: EasyPayService, private authService: AuthService,
    private dialog: MatDialog, private route: ActivatedRoute,
    private alertService: ToastrService, private gateService: GatesService) { }

  ngOnInit() {
    this.loadEasyPays();
  }
  loadEasyPays() {
    this.easypayService.getEasyPays(this.authService.decodedToken.nameid).subscribe((data) => {
      this.easyPays = new MatTableDataSource(data);
      this.easyPays.sort = this.sort;
      this.easyPays.paginator = this.paginator;
      this.easyPays.filterPredicate = (dataa, filter) => {
        return this.displayedColumns.some(el => {
          return el !== 'actions' && dataa[el].indexOf(filter) !== -1;
        });
      };
      this.loadingHideFlag = false;
      if (data.length > 0) {
        this.noContentHideFlag = true;
      }
    }, error => {
        this.alertService.error(error, 'خطا');
        this.loadingHideFlag = false;
    }
    );
  }
  onSearchClear() {
    this.searchKey = '';
    this.applyFilter();
  }
  applyFilter() {
    this.easyPays.filter = this.searchKey.trim();
  }
  onCreate() {
    this.formTitle = 'افزودن کارت بانکی جدید';
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    //
    this.gateService.getGates(this.authService.decodedToken.nameid).subscribe((dt: GatesWallets) => {
      dialogConfig.data = dt;
      const dialogRef = this.dialog.open(EasypayFormComponent, dialogConfig);
      const sub = dialogRef.componentInstance.newEasyPay.subscribe((data) => {
        this.insertEasyPay(data);
      });
      dialogRef.afterClosed().subscribe(() => {
        sub.unsubscribe();
      });
    }, error => {
        this.alertService.error(error, 'خطا');
        this.alertService.warning('لیست کیف پول ها و درگاه ها دریافت نشد. دوباره امتحان کنید', 'خطا');
    });
  }
  insertEasyPay(easypay: EasyPay) {
    // this.easyPays.push(easypay);
  }
  removeEasyPay(easypay: EasyPay) {
    // this.easypays.filter( p => p.id === easypay.id);
    // this.easypays.splice(this.easypays.indexOf(easypay), 1);
  }
}
