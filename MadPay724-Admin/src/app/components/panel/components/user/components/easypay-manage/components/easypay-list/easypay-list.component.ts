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
  easyPays: MatTableDataSource<any>;
  displayedColumns: string[] = ['id', 'name', 'code', 'actions'];
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  searchKey: string;
  loadingHideFlag = true;
  noContentHideFlag = false;
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
    this.router.navigate(['/panel/user/easypay/addedit']);
  }
  removeEasyPay(easypay: EasyPay) {
    // this.easypays.filter( p => p.id === easypay.id);
    // this.easypays.splice(this.easypays.indexOf(easypay), 1);
  }
}
