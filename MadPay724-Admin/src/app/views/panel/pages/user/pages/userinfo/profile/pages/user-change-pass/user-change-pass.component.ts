import { Component, OnInit, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/core/_services/panel/user.service';

@Component({
  selector: 'app-user-change-pass',
  templateUrl: './user-change-pass.component.html',
  styleUrls: ['./user-change-pass.component.css']
})
export class UserChangePassComponent implements OnInit {
  passModel: any = {};
  constructor(private userService: UserService, private alertService: ToastrService) { }

  ngOnInit() {
  }

  updateUserPass() {
    this.userService.updateUserPass(this.passModel).subscribe(next => {
      this.alertService.success('پسورد شما با موفقیت تغییر کرد', 'موفق');
          }, error => {
            this.alertService.error(error, 'خطا در تغییر پسورد');
    });
  }
}
