import { Component, OnInit, Output, EventEmitter, Inject } from '@angular/core';
import { EasyPayService } from 'src/app/Services/panel/user/easyPay.service';
import { AuthService } from 'src/app/Services/auth/auth.service';
import { Gate } from 'src/app/models/user/gate';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { GatesWallets } from 'src/app/models/user/gatesWallets';
import _ from 'lodash';
import { EasyPay } from 'src/app/models/user/easyPay';

@Component({
  selector: 'app-easypay-form',
  templateUrl: './easypay-form.component.html',
  styleUrls: ['./easypay-form.component.css']
})
export class EasypayFormComponent implements OnInit {
  @Output() newEasyPay = new EventEmitter<EasyPay>();
  @Output() updateEasyPay = new EventEmitter<EasyPay>();
  gatesWallets: GatesWallets;
  easypay: EasyPay;
  constructor(public easypayService: EasyPayService, private authService: AuthService,
              private alertService: ToastrService, private matdialogRef: MatDialogRef<EasypayFormComponent>,
              @Inject(MAT_DIALOG_DATA) private data: GatesWallets) { }

  ngOnInit() {
    this.gatesWallets = this.data;
  }
  getGates(): Gate[] {
    return _.filter(this.gatesWallets.gates, function(n) {
      return n.isActive;
    });
  }
  onClear() {
    this.easypayService.easypayForm.reset();
    this.matdialogRef.close();
  }
  onSubmitAdd() {
    if (this.easypayService.easypayForm.valid) {
      this.easypay = Object.assign({}, this.easypayService.easypayForm.value);
      if (this.addActive()) {

        this.easypayService.addEasyPay(this.easypay, this.authService.decodedToken.nameid).subscribe((data) => {
          this.alertService.success('ایزی پی شما با موفقیت ثبت شد', 'موفق');
          this.alertService.info('کارت شما در انتظار تایید میباشد', 'توجه');
          this.onClear();
          this.newEasyPay.emit(data);
        }, error => {
          this.alertService.error(error, 'خطا در ثبت کارت جدید');
        });
      } else {
        this.easypayService.updateEasyPay(this.easypay, this.authService.decodedToken.nameid, this.easypay.id).subscribe(() => {
          this.alertService.success('ایزی پی شما با موفقیت ویرایش شد', 'موفق');
          this.alertService.info('کارت شما در انتظار تایید میباشد', 'توجه');
          this.onClear();
          this.updateEasyPay.emit(this.easypay);
        }, error => {
          this.alertService.error(error, 'خطا در ثبت کارت جدید');
        });
      }
    } else {
      this.alertService.warning('اطلاعات کارت را به درستی وارد کنید', 'خطا');
    }
  }

  addActive(): boolean {
    return (this.easypayService.easypayForm.get('id').value === null ||
      this.easypayService.easypayForm.get('id').value === undefined);
  }
}
