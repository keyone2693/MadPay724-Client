import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatTableDataSource, MatPaginator, MatDialog, MatDialogConfig } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import {  Router } from '@angular/router';
import { EasyPay } from 'src/app/data/models/user/easyPay';
import { EasyPayService } from 'src/app/core/_services/panel/user/easyPay.service';

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
  constructor(private easypayService: EasyPayService,
    private router: Router,
    private alertService: ToastrService) { }

  ngOnInit() {
    this.loadEasyPays();
  }
  loadEasyPays() {
    this.easypayService.getEasyPays().subscribe((data) => {
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
    if (this.easyPays === null || this.easyPays === undefined) {
      this.alertService.error(' برای دسترسی به این بخش باید مدارک شما ارسال و تایید شده باشد '
        + ' برای بررسی مدارک به '
        + ' صفحه ارسال '
        + ' مراجعه کنید !!! ', 'توجه');
    } else {
      this.easyPays.filter = this.searchKey.trim();
    }
  }
  onCreate() {
    if (this.easyPays === null || this.easyPays === undefined) {
      this.alertService.error(' برای دسترسی به این بخش باید مدارک شما ارسال و تایید شده باشد '
        + ' برای بررسی مدارک به '
        + ' صفحه ارسال '
        + ' مراجعه کنید !!! ', 'توجه');
    } else {
      this.router.navigate(['/panel/user/easypay/add']);
    }
  }
  onDelete(easypay: EasyPay) {
      this.easypayService.deleteEasyPay( easypay.id).subscribe(() => {
        this.alertService.success('ایزی پی مورد نظر ب موفقیت حذف شد', 'موفق');
        this.easyPays.data.splice(this.easyPays.data.indexOf(easypay), 1);
        this.easyPays._updateChangeSubscription();
      }, error => {
        this.alertService.error(error, 'خطا در حذف ایزی پی');
      });
  }
}
