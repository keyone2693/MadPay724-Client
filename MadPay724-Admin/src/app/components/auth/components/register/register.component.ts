import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormControl } from '@angular/forms';

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
      name: new FormControl(),
      username: new FormControl(),
      password: new FormControl(),
      confirmPassword: new FormControl()
    });
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
