import { Component, OnInit, ViewChild, HostListener, Input } from '@angular/core';
import { NgForm, ControlContainer } from '@angular/forms';
import { UserService } from 'src/app/components/panel/services/user.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/components/auth/services/auth.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-user-edit-info',
  templateUrl: './user-edit-info.component.html',
  styleUrls: ['./user-edit-info.component.css']
})
export class UserEditInfoComponent implements OnInit {
  @ViewChild('editForm', {static: true}) editForm: NgForm;

  @Input() user: User;
  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    if (this.editForm.dirty) {
      $event.returnValue = true;
    }
  }
  constructor(private userService: UserService, private alertService: ToastrService,
              private authService: AuthService) { }

  ngOnInit() {
  }
  goToSaveBtn() {
    $('html , body').animate({
      scrollTop: $('#btnsave').offset().top + 20
    }, 500);
  }
  updateUserInfo() {
    this.userService.updateUserInfo(this.authService.decodedToken.nameid, this.user).subscribe(next => {
      this.alertService.success('اطلاعات کاربری با موفیقیت ویرایش شد', 'موفق');
      this.editForm.form.markAsPristine();
          }, error => {
            this.alertService.error(error, 'خطا در ویرایش');
    });
  }
}
