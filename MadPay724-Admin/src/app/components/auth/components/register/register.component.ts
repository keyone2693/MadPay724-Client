import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../Services/auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user: User;
  registerForm: FormGroup;
  constructor(private authService: AuthService, private alertService: ToastrService,
              private router: Router) { }

  ngOnInit() {
    this.registerForm = new FormGroup({
      name: new FormControl('', Validators.required),
      username: new FormControl('', [Validators.required , Validators.email]),
      phoneNumber: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(10)]),
      confirmPassword: new FormControl('', Validators.required),
      aproveRules: new FormControl(true, Validators.required)
    }, [this.passMatchValidator, this.aproveRulesValidator]);
  }
  passMatchValidator(g: FormGroup) {
    return g.get('password').value === g.get('confirmPassword').value ? null : { mismatch: true};
  }
  aproveRulesValidator(g: FormGroup) {
    return g.get('aproveRules').value === true ? null : { aprovemismatch: true};
  }
  register() {
    if (this.registerForm.valid) {
      this.user = Object.assign({}, this.registerForm.value);
      this.authService.register(this.user).subscribe(() => {
        this.alertService.success('با موفقیت ثبت نام شدید', 'موفق');
      }, error => {
        this.alertService.error(error, 'خطا در ثبت نام');
      }, () => {
        this.authService.login(this.user).subscribe(() => {
          this.router.navigate(['/panel/dashboard']);
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
