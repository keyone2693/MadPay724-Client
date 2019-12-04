import {  OnInit, Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { Notify } from 'src/app/data/models/notify';
import { NotificationService } from 'src/app/core/_services/panel/user/notification.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  notifyForm: FormGroup;
  notify: Notify;
  constructor(private route: ActivatedRoute, private alertService: ToastrService,
              private formBuilder: FormBuilder, private notifyService: NotificationService) {}

  ngOnInit() {
    this.loadNotify();
    this.createEditeNotifyForm();
  }
  createEditeNotifyForm() {
    this.notifyForm = this.formBuilder.group({
      enterEmail: [this.notify.enterEmail],
      enterSms: [this.notify.enterSms],
      enterTelegram: [this.notify.enterTelegram],
      exitEmail: [this.notify.exitEmail],
      exitSms: [this.notify.exitSms],
      exitTelegram: [this.notify.exitTelegram],
      ticketEmail: [this.notify.ticketEmail],
      ticketSms: [this.notify.ticketSms],
      ticketTelegram: [this.notify.ticketTelegram],
      loginEmail: [this.notify.loginEmail],
      loginSms: [this.notify.loginSms],
      loginTelegram: [this.notify.loginTelegram]
    });
  }
  loadNotify() {
    this.route.data.subscribe(data => {
      this.notify = data.notify;
    });
    // this.userService.getUser(this.authService.decodedToken.nameid).subscribe((user: User) => {
    //   this.user = user;
    // }, error => {
    //   this.alertService.error(error);
    // });
  }
  goToSaveBtn() {
    $('html , body').animate({
      scrollTop: $('#btnsave').offset().top + 20
    }, 500);
  }

  updateNotify() {
    this.notify = Object.assign({}, this.notifyForm.value);
    this.notifyService.updateNotify(this.notify)
    .subscribe(next => {
      this.alertService.success('تنظیمات اطلاع رسانی با موفقیت اپدیت شد', 'موفق');
      this.notifyForm.reset(this.notify);
    }, error => {
      this.alertService.error(error, 'خطا');
    });
  }

}
