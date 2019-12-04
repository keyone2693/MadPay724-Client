import { Component, OnInit, Output, EventEmitter, Inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import _ from 'lodash';
import { Router, ActivatedRoute } from '@angular/router';
import { GatesWallets } from 'src/app/data/models/user/gatesWallets';
import { EasyPay } from 'src/app/data/models/user/easyPay';
import { EasyPayService } from 'src/app/core/_services/panel/user/easyPay.service';
import { Gate } from 'src/app/data/models/user/gate';

@Component({
  selector: 'app-easypay-add',
  templateUrl: './easypay-add.component.html',
  styleUrls: ['./easypay-add.component.css']
})
export class EasypayAddComponent implements OnInit {
  gatesWallets: GatesWallets;
  easypay: EasyPay;
  constructor(public easypayService: EasyPayService,
              private alertService: ToastrService,
              private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.loadGatesWallets();
  }
  loadGatesWallets() {
    this.route.data.subscribe(data => {
      this.gatesWallets = data.gateswallets;
    });
  }
  getGates(): Gate[] {
    return _.filter(this.gatesWallets.gates, function (n) {
      return n.isActive;
    });
  }
  onClear() {
    this.easypayService.easypayForm.reset({
      walletGateId: '',
      isWallet: true,
      name: '',
      price: 0,
      text: '',
      isCoupon: false,
      isUserEmail: true,
      isUserName: true,
      isUserPhone: true,
      isUserText: true,
      isUserEmailRequired: false,
      isUserNameRequired: false,
      isUserPhoneRequired: false,
      isUserTextRequired: false,
      userEmailExplain: 'ایمیل',
      userNameExplain: 'نام',
      userPhoneExplain: 'شماره تماس',
      userTextExplain: 'توضیحات',
      isCountLimit: false,
      countLimit: 0,
      returnSuccess: '',
      returnFail: ''
    });
    this.router.navigate(['/panel/user/easypay']);
  }
  onSubmit() {
    if (this.easypayService.easypayForm.valid) {
      this.easypay = Object.assign({}, this.easypayService.easypayForm.value);
      this.easypayService.addEasyPay(this.easypay).subscribe((data) => {
        this.alertService.success('ایزی پی شما با موفقیت ثبت شد', 'موفق');
        this.onClear();
      }, error => {
        this.alertService.error(error, 'خطا در ثبت ایزی پی جدید');
      });
    } else {
      this.alertService.warning('اطلاعات ایزی پی را به درستی وارد کنید', 'خطا');
    }
  }
  getIsWallet(): boolean {
    if (this.easypayService.easypayForm.get('isWallet').value === 'true'
      || this.easypayService.easypayForm.get('isWallet').value === true) {
      return true;
    } else {
      return false;
    }
  }
}
