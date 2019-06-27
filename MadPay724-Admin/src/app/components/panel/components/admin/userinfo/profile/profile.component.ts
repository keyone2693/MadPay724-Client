import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/components/panel/services/user.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/components/auth/services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  @ViewChild('editForm', {static: false}) editForm: NgForm;
  user: User;
  passModel: any = {};
  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    if (this.editForm.dirty) {
      $event.returnValue = true;
    }
  }

  constructor(private userService: UserService, private alertService: ToastrService,
              private authService: AuthService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.loadUser();
  }
  goToSaveBtn() {
    $('html , body').animate({
      scrollTop: $('#btnsave').offset().top + 20
    }, 500);
  }

  loadUser() {
    this.route.data.subscribe(data => {
      this.user = data.user;
    });
    // this.userService.getUser(this.authService.decodedToken.nameid).subscribe((user: User) => {
    //   this.user = user;
    // }, error => {
    //   this.alertService.error(error);
    // });
   }
    updateUserInfo() {
      this.userService.updateUserInfo(this.authService.decodedToken.nameid, this.user).subscribe(next => {
        this.alertService.success('اطلاعات کاربری با موفیقیت ویرایش شد', 'موفق');
        this.editForm.form.markAsPristine();
            }, error => {
              this.alertService.error(error, 'خطا در ویرایش');
      });
    }

    updateUserPass() {
      this.userService.updateUserPass(this.authService.decodedToken.nameid, this.passModel).subscribe(next => {
        this.alertService.success('پسورد شما با موفقیت تغییر کرد', 'موفق');
        this.editForm.form.markAsPristine();
            }, error => {
              this.alertService.error(error, 'خطا در تغییر پسورد');
      });
    }
}
