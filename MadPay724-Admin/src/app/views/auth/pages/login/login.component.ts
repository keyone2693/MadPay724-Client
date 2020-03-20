import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/_services/auth/auth.service';
import { AuthService as SocialAuthService, SocialUser } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";
import { Store } from '@ngrx/store';

import * as fromStore from 'src/app/store';
import { Observable } from 'rxjs';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model: any = {};
  returnUrl: any = '';
  private socialLoggedInUser$: Observable<SocialUser>;
  constructor(private authService: AuthService, private socialAuthService: SocialAuthService,
    private router: Router,
    private alertService: ToastrService, private route: ActivatedRoute,
    private store: Store<fromStore.State>) { }

  ngOnInit() {
    this.socialLoggedInUser$ = this.socialAuthService.authState;
    this.model.isremember = true;
    this.model.granttype = 'password';
    this.route.queryParams.subscribe(params => this.returnUrl = params.return);
  }

  login() {
    this.authService.login(this.model).subscribe(next => {
      this.store.dispatch(new fromStore.InitHub());
      if (this.returnUrl === null || this.returnUrl === undefined) {
        this.returnUrl = this.authService.getDashboardUrl();
      }
      this.router.navigate([this.returnUrl]);
      this.alertService.success('با موفقیت وارد شدید', 'موفق');
    }, error => {
      this.alertService.error(error, 'خطا در ورود');
    });
  }

  signInWithGoogle(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  signInWithFB(): void {
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  

}
