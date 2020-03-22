import { Component, OnInit, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/_services/auth/auth.service';
import { ApiReturn } from 'src/app/data/models/common/apiReturn';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @ViewChild('ngOtpInput') ngOtpInputRef: any;//Get reference using ViewChild and the specified hash

  countDownConfig = {
    leftTime: 60,
    format: ' (s) '
  };
  config = {
    allowNumbersOnly: true,
    length: 5,
    isPasswordInput: false,
    disableAutoFocus: false,
    placeholder: '',
    inputStyles: {
      'width': '18%',
      'margin-right': '2%',
      'float': 'left',
      'height': '50px'
    }
  };
 
  registerForm: FormGroup;
  showRegisterSection = true;
  showCountDown = true;
  constructor(private authService: AuthService, private alertService: ToastrService,
              private router: Router) {}

  ngOnInit() {
    this.registerForm = new FormGroup({
      grantType: new FormControl('password'),
      name: new FormControl('', Validators.required),
      userName: new FormControl('', [Validators.required , Validators.pattern('0[0-9]{10}') ]),
      password: new FormControl('', [Validators.required, Validators.pattern('(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{4,10}') ]),
      aproveRules: new FormControl(true, Validators.required),
      code: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(5)])
    }, [this.aproveRulesValidator]);
  }
  // passMatchValidator(g: FormGroup) {
  //   return g.get('password').value === g.get('confirmPassword').value ? null : { mismatch: true};
  // }
  aproveRulesValidator(g: FormGroup) {
    return g.get('aproveRules').value === true ? null : { aprovemismatch: true};
  }
  onOtpChange(otp) {
    this.registerForm.get('code').setValue(otp);
    if (otp.length === 5) {
      this.register();
    }
  }
  handleCountDownEvent(event) {
    if (event.left > 0){
      this.showCountDown = true;
    }else {
      this.showCountDown = false;
    }
  }
  getCode() {
    if (this.registerForm.get('name').hasError('required')
      || this.registerForm.get('userName').hasError('required')
      || this.registerForm.get('userName').hasError('pattern')
      || this.registerForm.get('password').hasError('required')
      || this.registerForm.get('password').hasError('pattern')
      || this.registerForm.hasError('mismatch')
      || this.registerForm.get('aproveRules').hasError('required')) {
            this.alertService.warning('اطلاعات را درست وارد کنید و قوانین را تایید کنید', 'خطا');
    } else {
      var mobile = this.registerForm.get("userName").value;

      this.authService.getVerificationCode(mobile).subscribe((data: ApiReturn<number>) => {
        this.showCountDown = true;
        this.countDownConfig  = {
          leftTime: data.result,
          format: ' (s) '
        };
        this.alertService.success(data.message, 'موفق');
        this.showRegisterSection = false;
      }, error => {
          this.alertService.warning(error, 'خطا در ثبت نام');
          this.registerForm.get('code').setValue('');
          this.ngOtpInputRef.setValue('');
      }
        //, () => {
        //   this.authService.login(data).subscribe(() => {
        //     this.router.navigate(['/panel/user/dashboard']);
        //   }, error => {
        //     this.alertService.warning(error, 'ثبت نام موفق خطا در ورود');
        //   });
        // }
      );
    }
    // this.authService.register(this.model).subscribe(() => {
    //   this.alertService.success('با موفقیت ثبت نام شدید', 'موفق');
    // }, error => {
    //   this.alertService.error(error, 'خطا در ثبت نام');
    // });
  }
  register() {
    if (this.registerForm.valid) {
      var data = Object.assign({}, this.registerForm.value);
      this.authService.register(data).subscribe(() => {
        this.alertService.success('با موفقیت ثبت نام شدید', 'موفق');
      }, error => {
          this.alertService.error(error, 'خطا در ثبت نام');
          this.registerForm.get('code').setValue('');
          this.ngOtpInputRef.setValue('');
      }, () => {
          this.authService.login(data).subscribe(() => {
          this.router.navigate(['/panel/user/dashboard']);
        }, error => {
          this.alertService.warning(error, 'ثبت نام موفق خطا در ورود');
        });
      });
    } else {
      this.alertService.warning('اطلاعات را درست وارد کنید و قوانین را تایید کنید', 'خطا');
    }
    // this.authService.register(this.model).subscribe(() => {
    //   this.alertService.success('با موفقیت ثبت نام شدید', 'موفق');
    // }, error => {
    //   this.alertService.error(error, 'خطا در ثبت نام');
    // });
  }
}
