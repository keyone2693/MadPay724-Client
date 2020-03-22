import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/_services/auth/auth.service';
import { AuthService as SocialAuthService, SocialUser } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";
import { Store } from '@ngrx/store';

import * as fromStore from 'src/app/store';
import { Observable, Subscription } from 'rxjs';
import { SocialRegister } from 'src/app/data/models/auth/socialRegister';
import { User } from 'src/app/data/models/user';
import { ApiReturn } from 'src/app/data/models/common/apiReturn';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  subManager = new Subscription();
  //***********
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
    this.subManager.add(
      this.route.queryParams.subscribe(params => this.returnUrl = params.return)
    );
  }
  ngOnDestroy() {
    this.subManager.unsubscribe();
  }
  login() {
    this.subManager.add(
      this.authService.login(this.model).subscribe(next => {
        this.store.dispatch(new fromStore.InitHub());
        if (this.returnUrl === null || this.returnUrl === undefined) {
          this.returnUrl = this.authService.getDashboardUrl();
        }
        this.router.navigate([this.returnUrl]);
        this.alertService.success('با موفقیت وارد شدید', 'موفق');
      }, error => {
        this.alertService.error(error, 'خطا در ورود');
      })
    );
    
  }

  signInWithGoogle(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID).then((response) => {
      const model: SocialRegister = {
        userId: response.id,
        name: response.firstName + ' ' + response.lastName,
        email: response.email,
        photoUrl: response.photoUrl,
        provider: response.provider
      };
      //
      this.subManager.add(
        this.authService.registerWithSocial(model).subscribe((res: ApiReturn<User>) => {
          if (res.result.isRegisterBefore) {
            this.alertService.success(res.message, 'موفق');
          } else {
            this.alertService.success(res.message, 'موفق');
            this.alertService.info('پسورد شما همان آدرس ایمیل اکانت گوگل شما میباشد ... لطفا در اولین فرصت در بخش پروفایل کاربری آنرا تغییر دهید', 'توجه');
          }
          this.subManager.add(
            this.authService.loginWithSocial(res.result.userName, "GOOGLE").subscribe(() => {
              this.router.navigate(['/panel/common/user/dashboard']);
            }, error => {
              this.alertService.warning(error, 'ثبت نام موفق خطا در ورود');
            })
          );
          
        }, error => {
            this.alertService.warning(error, 'ناموفق');
        })
      );
    }, (error) => {
      this.alertService.error(error, 'ناموفق');
    });
  }
  signInWithFB(): void {
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID).then((response) => {
      if (response.email == null || response.email == undefined) {
        this.alertService.warning('اکانت فیسبوک شما ایمیل ثبت شده ندارد', 'ناموفق');
        this.alertService.info('لطفا ابتدا در اکانت فیسبوک در بخش پروفایل کاربری فیسبوک خود ایمیلی را ثبت کنید', 'ناموفق');
      } else {
        const model: SocialRegister = {
          userId: response.id,
          name: response.firstName + ' ' + response.lastName,
          email: response.email,
          photoUrl: response.photoUrl,
          provider: response.provider
        };
        this.subManager.add(
          this.authService.registerWithSocial(model).subscribe((res: ApiReturn<User>) => {
            if (res.result.isRegisterBefore) {
              this.alertService.success(res.message, 'موفق');
            } else {
              this.alertService.success(res.message, 'موفق');
              this.alertService.info('پسورد شما همان آدرس ایمیل اکانت فیسبوک شما میباشد ... لطفا در اولین فرصت در بخش پروفایل کاربری آنرا تغییر دهید', 'توجه');
            }
            this.subManager.add(
              this.authService.loginWithSocial(res.result.userName, "FACBOOK").subscribe(() => {
                this.router.navigate(['/panel/common/user/dashboard']);
              }, error => {
                this.alertService.warning(error, 'ثبت نام موفق خطا در ورود');
              })
            );

          }, error => {
            this.alertService.warning(error, 'ناموفق');
          })
        );
      }      
    }, (error) => {
      this.alertService.error(error, 'ناموفق');
    });
  }


}
