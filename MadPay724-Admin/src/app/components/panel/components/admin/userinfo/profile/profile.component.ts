import { Component, OnInit, ViewChild, HostListener, Input } from '@angular/core';
import { User } from 'src/app/models/user';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/components/auth/services/auth.service';
import { UserService } from 'src/app/components/panel/services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private route: ActivatedRoute, private userService: UserService, private alertService: ToastrService,
              private authService: AuthService) { }
 @ViewChild('editForm', {static: true}) editForm: NgForm;
  user: User;
  photoUrl: string;
  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    if (this.editForm.dirty) {
      $event.returnValue = true;
    }
  }

  ngOnInit() {
    this.authService.currentPhotoUrl.subscribe(pu => this.photoUrl = pu);
    this.loadUser();
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

//   updateUserPhotoUrl(photoUrl) {
//   this.user.photoUrl = photoUrl;
//   }
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
}
