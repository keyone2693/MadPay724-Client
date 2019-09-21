import { Component, OnInit, ViewChild } from '@angular/core';
import { EasyPay } from 'src/app/models/user/easyPay';
import { AuthService } from 'src/app/Services/auth/auth.service';
import { MatSort, MatTableDataSource, MatPaginator, MatDialog, MatDialogConfig } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import {  Router } from '@angular/router';
import { EasyPayService } from 'src/app/Services/panel/user/easyPay.service';

@Component({
  selector: 'app-easypay-list',
  templateUrl: './easypay-list.component.html',
  styleUrls: ['./easypay-list.component.css']
})
export class EasypayListComponent implements OnInit {
  easyPays: MatTableDataSource<EasyPay>;
  displayedColumns: string[] = ['id', 'name', 'price', 'actions'];
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  searchKey: string;
  loadingHideFlag = false;
  noContentHideFlag = true;
  constructor(private easypayService: EasyPayService, private authService: AuthService,
    private router: Router,
    private alertService: ToastrService) { }

  ngOnInit() {
    this.loadEasyPays();
  }
  loadEasyPays() {
    this.easypayService.getEasyPays(this.authService.decodedToken.nameid).subscribe((data) => {
      this.easyPays = new MatTableDataSource(data);
      this.easyPays.sort = this.sort;
      this.easyPays.paginator = this.paginator;
      this.loadingHideFlag = true;
      if (data.length === 0) {
        this.noContentHideFlag = false;
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
    this.router.navigate(['/panel/user/easypay/add']);
  }
  onDelete(easypay: EasyPay) {
      this.easypayService.deleteEasyPay(this.authService.decodedToken.nameid, easypay.id).subscribe(() => {
        this.alertService.success('ایزی پی مورد نظر ب موفقیت حذف شد', 'موفق');
        this.easyPays.data.splice(this.easyPays.data.indexOf(easypay), 1);
        this.easyPays._updateChangeSubscription();
      }, error => {
        this.alertService.error(error, 'خطا در حذف ایزی پی');
      });
  }
}
