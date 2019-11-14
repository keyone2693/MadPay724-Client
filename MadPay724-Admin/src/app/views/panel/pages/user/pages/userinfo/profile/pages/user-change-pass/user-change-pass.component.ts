import { Component, OnInit, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/core/_services/panel/user.service';
import { AuthService } from 'src/app/core/_services/auth/auth.service';

@Component({
  selector: 'app-user-change-pass',
  templateUrl: './user-change-pass.component.html',
  styleUrls: ['./user-change-pass.component.css']
})
export class UserChangePassComponent implements OnInit {
  passModel: any = {};
  constructor(private userService: UserService, private alertService: ToastrService,
              private authService: AuthService) { }

  ngOnInit() {
  }

  updateUserPass() {
    this.userService.updateUserPass(this.authService.decodedToken.nameid, this.passModel).subscribe(next => {
      this.alertService.success('پسورد شما با موفقیت تغییر کرد', 'موفق');
          }, error => {
            this.alertService.error(error, 'خطا در تغییر پسورد');
    });
  }
}
