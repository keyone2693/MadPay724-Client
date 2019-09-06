import { Component, OnInit, Output, EventEmitter, Inject } from '@angular/core';
import { Gate } from 'src/app/models/user/gate';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/Services/auth/auth.service';
import { Router } from '@angular/router';
import { Wallet } from 'src/app/models/wallet';
import { GatesService } from 'src/app/Services/panel/user/gateService.service';

@Component({
  selector: 'app-gate-form',
  templateUrl: './gate-form.component.html',
  styleUrls: ['./gate-form.component.css']
})
export class GateFormComponent implements OnInit {
  @Output() newGate = new EventEmitter<Gate>();
  gate: Gate;
  wallets: Wallet[];
  constructor(private authService: AuthService, public gateService: GatesService,
              private alertService: ToastrService, private matdialogRef: MatDialogRef<GateFormComponent>,
              private router: Router, @Inject(MAT_DIALOG_DATA) private data: Wallet[]) { }

  ngOnInit() {
    this.wallets = this.data;
  }
  onClear() {
    this.gateService.gateForm.reset();
    this.matdialogRef.close();
  }
  onSubmitAdd() {
    if (this.gateService.gateForm.valid) {
      this.gateService.addGate(this.gateService.gateForm.value, this.authService.decodedToken.nameid).subscribe((data) => {
        this.alertService.success(' درگاه پرداخت شما با موفقیت ثبت شد', 'موفق');
        this.onClear();
        this.newGate.emit();
      }, error => {
        this.alertService.error(error, 'خطا در ثبت درگاه پرداخت جدید');
      });
    } else {
      this.alertService.warning('اطلاعات درگاه پرداخت را به درستی وارد کنید', 'خطا');
    }
  }

}
