import { OnInit, HostListener, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/core/_services/panel/user.service';
import { User } from 'src/app/data/models/user';
import { Store } from '@ngrx/store';

import * as fromStore from 'src/app/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: User;
  photoUrl$: Observable<string>;
  editForm: FormGroup;
  constructor(private route: ActivatedRoute, private userService: UserService,
    private alertService: ToastrService,
    private formBuilder: FormBuilder,
    private store: Store<fromStore.State>) { }

  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    if (this.editForm.dirty) {
      $event.returnValue = true;
    }
  }

  ngOnInit() {
    this.loadUser();
    this.createEditUserInfoForm();
    this.photoUrl$ = this.store.select(fromStore.getLoggedUserPhotoUrl);

  }

  createEditUserInfoForm() {
    this.editForm = this.formBuilder.group({
      name: [this.user.name, [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      phoneNumber: [this.user.phoneNumber, Validators.required],
      gender: [this.user.gender],
      city: [this.user.city],
      address: [this.user.address]
    });
  }

  goToSaveBtn() {
    $('html , body').animate({
      scrollTop: $('#btnsave').offset().top + 20
    }, 500);
  }
  updateUserInfo() {
    this.user = Object.assign({}, this.editForm.value);
    this.userService.updateUserInfo(this.user).subscribe(next => {
      this.alertService.success('اطلاعات کاربری با موفیقیت ویرایش شد', 'موفق');
      this.editForm.reset(this.user);
      this.store.dispatch(new fromStore.UpdateInfoLoggedUserName(this.user));
    }, error => {
      this.alertService.error(error, 'خطا در ویرایش');
    });
  }
  loadUser() {
    this.route.data.subscribe(data => {
      this.user = data.user;
    });
  }
}
