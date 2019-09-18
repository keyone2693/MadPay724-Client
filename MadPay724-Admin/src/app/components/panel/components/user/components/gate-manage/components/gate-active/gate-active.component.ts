import { Component, OnInit, EventEmitter, Inject, Output } from '@angular/core';
import { AuthService } from 'src/app/Services/auth/auth.service';
import { GatesService } from 'src/app/Services/panel/user/gateService.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GateActiveDirect } from 'src/app/models/user/gateActiveDirect';

@Component({
  selector: 'app-gate-active',
  templateUrl: './gate-active.component.html',
  styleUrls: ['./gate-active.component.css']
})
export class GateActiveComponent implements OnInit {

  @Output() activeFlag = new EventEmitter<boolean>();
  gateActiveDirect: GateActiveDirect;
  constructor(private authService: AuthService, public gateService: GatesService,
              private alertService: ToastrService, private matdialogRef: MatDialogRef<GateActiveComponent>,
    private router: Router, @Inject(MAT_DIALOG_DATA) private data: GateActiveDirect, private formBuilder: FormBuilder) { }

  gateForm: FormGroup = this.formBuilder.group({
    walletId: ['', Validators.required],
    isDirect: [true],
  });
  ngOnInit() {
    this.gateActiveDirect = this.data;
  }

  onClear() {
    this.gateForm.reset();
    this.matdialogRef.close();
  }
  onActive() {
    if (this.gateForm.valid) {

      this.gateForm.get('isDirect').setValue(this.gateActiveDirect.isDirect);

      this.gateService.activeGate(
        this.gateForm.value,
        this.authService.decodedToken.nameid,
        this.gateActiveDirect.gate.id).subscribe(() => {
          if (this.gateActiveDirect.isDirect) {
            this.alertService.success(' در گاه با موفقیت مستقیم شد', 'موفق');
          } else {
            this.alertService.success(' درگاه مستقیم با موفقیت غیر فعال شد', 'موفق');
          }
          this.onClear();
          this.activeFlag.emit(this.gateActiveDirect.isDirect);
      }, error => {
        this.alertService.error(error, 'خطا');
      });
    } else {
      this.alertService.warning('اطلاعات  را به درستی وارد کنید', 'خطا');
    }
  }

}
