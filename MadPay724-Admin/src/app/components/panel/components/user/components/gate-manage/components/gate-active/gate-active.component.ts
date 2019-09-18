import { Component, OnInit, EventEmitter, Inject, Output } from '@angular/core';
import { AuthService } from 'src/app/Services/auth/auth.service';
import { GatesService } from 'src/app/Services/panel/user/gateService.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Gate } from 'src/app/models/user/gate';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Wallet } from 'src/app/models/wallet';
import { GateWallets } from 'src/app/models/user/gateWallets';

@Component({
  selector: 'app-gate-active',
  templateUrl: './gate-active.component.html',
  styleUrls: ['./gate-active.component.css']
})
export class GateActiveComponent implements OnInit {

  @Output() activeFlag = new EventEmitter<boolean>();
  gatewallets: GateWallets;
  constructor(private authService: AuthService, public gateService: GatesService,
              private alertService: ToastrService, private matdialogRef: MatDialogRef<GateActiveComponent>,
              private router: Router, @Inject(MAT_DIALOG_DATA) private data: GateWallets, private formBuilder: FormBuilder) { }

  gateForm: FormGroup = this.formBuilder.group({
    walletId: ['', Validators.required]
  });
  ngOnInit() {
    this.gatewallets = this.data;
  }

  onClear() {
    this.gateForm.reset();
    this.matdialogRef.close();
  }
  onActive() {
    if (this.gateService.gateForm.valid) {
      this.gateService.activeGate(
        this.gateService.gateForm.value,
        this.authService.decodedToken.nameid,
        this.gatewallets.gate.id).subscribe(() => {
          this.alertService.success(' در گاه با موفقیت فعال شد', 'موفق');
          this.onClear();
          this.activeFlag.emit(true);
      }, error => {
        this.alertService.error(error, 'خطا');
      });
    } else {
      this.alertService.warning('اطلاعات  را به درستی وارد کنید', 'خطا');
    }
  }

}
