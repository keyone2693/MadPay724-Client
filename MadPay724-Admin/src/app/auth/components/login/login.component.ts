import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { parseLazyRoute } from '@angular/compiler/src/aot/lazy_routes';




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
    this.route.queryParams.subscribe(params => this.returnUrl = params['return'] || '/panel');
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
