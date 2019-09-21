import { Component, OnInit, Output, EventEmitter, Inject } from '@angular/core';
import { EasyPayService } from 'src/app/Services/panel/user/easyPay.service';
import { AuthService } from 'src/app/Services/auth/auth.service';
import { Gate } from 'src/app/models/user/gate';
import { ToastrService } from 'ngx-toastr';
import { GatesWallets } from 'src/app/models/user/gatesWallets';
import _ from 'lodash';
import { EasyPay } from 'src/app/models/user/easyPay';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-easypay-add',
  templateUrl: './easypay-add.component.html',
  styleUrls: ['./easypay-add.component.css']
})
export class EasypayAddComponent implements OnInit {
  gatesWallets: GatesWallets;
  easypay: EasyPay;
  constructor(public easypayService: EasyPayService, private authService: AuthService,
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
    this.router.navigate(['/panel/user/easypay']);
  }
  onSubmit() {
    if (this.easypayService.easypayForm.valid) {
      this.easypay = Object.assign({}, this.easypayService.easypayForm.value);
      this.easypayService.addEasyPay(this.easypay, this.authService.decodedToken.nameid).subscribe((data) => {
        this.alertService.success('ایزی پی شما با موفقیت ثبت شد', 'موفق');
        this.onClear();
      }, error => {
        this.alertService.error(error, 'خطا در ثبت ایزی پی جدید');
      });
    } else {
      this.alertService.warning('اطلاعات ایزی پی را به درستی وارد کنید', 'خطا');
    }
  }
}
