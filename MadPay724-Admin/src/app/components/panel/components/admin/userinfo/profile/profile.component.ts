import { Component, OnInit, ViewChild, HostListener, Input } from '@angular/core';
import { User } from 'src/app/models/user';
import { ActivatedRoute } from '@angular/router';
import { NgForm, FormBuilder, FormGroup, Validators } from '@angular/forms';
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
              private authService: AuthService, private formBuilder: FormBuilder) { }
  user: User;
  photoUrl: string;
  editForm: FormGroup;
  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    if (this.editForm.dirty) {
      $event.returnValue = true;
    }
  }

  ngOnInit() {
    this.authService.currentPhotoUrl.subscribe(pu => this.photoUrl = pu);
    this.loadUser();
    this.createEditUserInfoForm();
  }

  createEditUserInfoForm() {
    this.editForm = this.formBuilder.group({
      name: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      gender: [''],
      city: [''],
      address: ['']
    });
  }

  goToSaveBtn() {
    $('html , body').animate({
      scrollTop: $('#btnsave').offset().top + 20
    }, 500);
  }
  updateUserInfo() {
    this.userService.updateUserInfo(this.authService.decodedToken.nameid, this.user).subscribe(next => {
      this.alertService.success('اطلاعات کاربری با موفیقیت ویرایش شد', 'موفق');
      this.editForm.reset(this.user);
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
