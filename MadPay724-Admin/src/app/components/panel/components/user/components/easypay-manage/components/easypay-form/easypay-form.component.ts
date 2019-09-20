import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { EasyPayService } from 'src/app/Services/panel/user/easyPay.service';
import { AuthService } from 'src/app/Services/auth/auth.service';
import { Gate } from 'src/app/models/user/gate';
import { Wallet } from 'src/app/models/wallet';
import { EasyPay } from 'src/app/models/user/easyPay';
import { MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-easypay-form',
  templateUrl: './easypay-form.component.html',
  styleUrls: ['./easypay-form.component.css']
})
export class EasypayFormComponent implements OnInit {
  @Output() newEasyPay = new EventEmitter<EasyPay>();
  @Output() updateEasyPay = new EventEmitter<EasyPay>();
  gates: Gate[];
  wallets: Wallet[];
  easypay: EasyPay;
  constructor(public easypayService: EasyPayService, private authService: AuthService,
              private alertService: ToastrService, private matdialogRef: MatDialogRef<EasypayFormComponent>,
              private router: Router) { }

  ngOnInit() {
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
