import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  model: any = {};
  constructor(private authService: AuthService, private alertService: ToastrService) { }

  ngOnInit() {
  }
  register() {
    this.authService.register(this.model).subscribe(() => {
      this.alertService.success('با موفقیت ثبت نام شدید', 'موفق');
    }, error => {
      this.alertService.error(error, 'خطا در ثبت نام');
    });
  }
}
