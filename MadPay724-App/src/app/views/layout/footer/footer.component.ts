import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {

  constructor(private alertService: ToastrService) { }

  onSendEmail() {
    this.alertService.warning('این بخش موقتا غیر فعال میباشد', 'ناموفق');
  }

}
