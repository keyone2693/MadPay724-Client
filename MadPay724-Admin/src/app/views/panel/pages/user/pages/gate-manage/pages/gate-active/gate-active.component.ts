import { Component, OnInit, EventEmitter, Inject, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GateActiveDirect } from 'src/app/data/models/user/gateActiveDirect';
import { GatesService } from 'src/app/core/_services/panel/user/gateService.service';

@Component({
  selector: 'app-gate-active',
  templateUrl: './gate-active.component.html',
  styleUrls: ['./gate-active.component.css']
})
export class GateActiveComponent implements OnInit {

  @Output() activeFlag = new EventEmitter<boolean>();
  gateActiveDirect: GateActiveDirect;
  constructor( public gateService: GatesService,
              private alertService: ToastrService, private matdialogRef: MatDialogRef<GateActiveComponent>,
    private router: Router, @Inject(MAT_DIALOG_DATA) private data: GateActiveDirect, private formBuilder: FormBuilder) { }

  gateForm: FormGroup = this.formBuilder.group({
    walletId: ['', Validators.required],
    isDirect: [true],
  });
  ngOnInit() {
    this.gateActiveDirect = this.data;

    this.gateForm.get('isDirect').setValue(this.gateActiveDirect.isDirect);
    if (!this.gateActiveDirect.isDirect) {
      this.gateForm.get('walletId').setValue(this.gateActiveDirect.wallets[0].id);
    }
  }

  onClear() {
    this.gateForm.reset();
    this.matdialogRef.close();
  }
  onActive() {
    if (this.gateForm.valid) {      
      this.gateService.activeGate(
        this.gateForm.value,
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
