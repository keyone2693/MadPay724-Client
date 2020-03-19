import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/data/models/user';
import { AuthService } from 'src/app/core/_services/auth/auth.service';
import { ApiReturn } from 'src/app/data/models/common/apiReturn';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  waitAmount = 0;
  showRegisterSection = true;
  constructor(private authService: AuthService, private alertService: ToastrService,
              private router: Router) {}

  ngOnInit() {
    this.registerForm = new FormGroup({
      name: new FormControl('', Validators.required),
      userName: new FormControl('', [Validators.required , Validators.pattern("0[0-9]{10}") ]),
      password: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(10)]),
      confirmPassword: new FormControl('', Validators.required),
      aproveRules: new FormControl(true, Validators.required),
      code: new FormControl('0', [Validators.required, Validators.minLength(5), Validators.maxLength(5)])
    }, [this.passMatchValidator, this.aproveRulesValidator]);
  }
  passMatchValidator(g: FormGroup) {
    return g.get('password').value === g.get('confirmPassword').value ? null : { mismatch: true};
  }
  aproveRulesValidator(g: FormGroup) {
    return g.get('aproveRules').value === true ? null : { aprovemismatch: true};
  }
  getCode() {
    if (this.registerForm.valid) {
      var mobile = this.registerForm.get("userName").value;

      this.authService.getVerificationCode(mobile).subscribe((data: ApiReturn<number>) => {
        this.waitAmount = data.result;
        this.alertService.success(data.message, 'موفق');
        this.showRegisterSection = false;
      }, (error: ApiReturn<number>) => {
        this.alertService.error(error.message, 'خطا در ثبت نام');
      }
       //, () => {
      //   this.authService.login(data).subscribe(() => {
      //     this.router.navigate(['/panel/user/dashboard']);
      //   }, error => {
      //     this.alertService.warning(error, 'ثبت نام موفق خطا در ورود');
      //   });
      // }
      );
    } else {
      this.alertService.warning('اطلاعات را درست وارد کنید و قوانین را تایید کنید', 'خطا');
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
