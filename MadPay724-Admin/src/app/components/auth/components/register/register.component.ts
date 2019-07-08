import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  model: any = {};
  registerForm: FormGroup;
  constructor(private authService: AuthService, private alertService: ToastrService) { }

  ngOnInit() {
    this.registerForm = new FormGroup({
      name: new FormControl('', Validators.required),
      username: new FormControl('', [Validators.required , Validators.email]),
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
    console.log(this.registerForm.value);
    // this.authService.register(this.model).subscribe(() => {
    //   this.alertService.success('با موفقیت ثبت نام شدید', 'موفق');
    // }, error => {
    //   this.alertService.error(error, 'خطا در ثبت نام');
    // });
  }
}
