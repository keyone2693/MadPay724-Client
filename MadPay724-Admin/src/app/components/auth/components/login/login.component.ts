import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../Services/auth/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model: any = {};
  returnUrl: any = '';
  constructor(private authService: AuthService, private router: Router,
              private alertService: ToastrService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.model.isremember = true;
    this.model.granttype = 'password';
    this.route.queryParams.subscribe(params => this.returnUrl = params.return || '/panel/user/dashboard');
  }

  login() {
    this.authService.login(this.model).subscribe(next => {
      this.router.navigate([this.returnUrl]);
      this.alertService.success('با موفقیت وارد شدید', 'موفق');
    }, error => {
      this.alertService.error(error, 'خطا در ورود');
    });
  }

}
