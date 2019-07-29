import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot, ActivatedRouteSnapshot} from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../Services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginRedirectGuard implements CanActivate {
constructor(private router: Router, private authService: AuthService, private alertService: ToastrService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (!this.loggedIn()) {
      return true;
    } else {
        this.router.navigate(['/panel/user/dashboard']);
        this.alertService.warning('شما قبلا وارد شده اید', 'موفق');
        return false;
    }
  }

  loggedIn() {
    return this.authService.loggedIn();
   }
}
