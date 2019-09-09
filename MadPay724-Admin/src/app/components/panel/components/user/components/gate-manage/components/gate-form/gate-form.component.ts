import { Component, OnInit, Output, EventEmitter, Inject } from '@angular/core';
import { Gate } from 'src/app/models/user/gate';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/Services/auth/auth.service';
import { Router } from '@angular/router';
import { Wallet } from 'src/app/models/wallet';
import { GatesService } from 'src/app/Services/panel/user/gateService.service';
import { ValidationErrors, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-gate-form',
  templateUrl: './gate-form.component.html',
  styleUrls: ['./gate-form.component.css']
})
export class GateFormComponent implements OnInit {
  @Output() newGate = new EventEmitter<Gate>();
  gate: Gate;
  wallets: Wallet[];
  slectedFile: File;
  imgUrl = '../../../../../../../../..//assets/img/logos/logo-gate.png';
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
  onFileSelect(file) {
    if (file.target.files[0]) {
      this.slectedFile = file.target.files[0] as File;
      const reader = new FileReader();
      reader.readAsDataURL(this.slectedFile);
      reader.onload = (event: any) => {
        this.imgUrl = event.target.result;
      };
    }
  }
  onSubmitAdd() {
    const gate = new FormData();
    // document = Object.assign({}, this.docLeftForm.value);
    gate.append('file', this.slectedFile, this.slectedFile.name);
    gate.append('walletId', this.gateService.gateForm.get('walletId').value);
    gate.append('isIp', this.gateService.gateForm.get('isIp').value);
    gate.append('websiteName', this.gateService.gateForm.get('websiteName').value);
    gate.append('websiteUrl', this.gateService.gateForm.get('websiteUrl').value);
    gate.append('phoneNumber', this.gateService.gateForm.get('phoneNumber').value);
    gate.append('text', this.gateService.gateForm.get('text').value);
    gate.append('grouping', this.gateService.gateForm.get('grouping').value);

    if (this.gateService.gateForm.valid) {
      this.gateService.addGate(this.gate, this.authService.decodedToken.nameid).subscribe((data) => {
        this.alertService.success(' درگاه پرداخت شما با موفقیت ثبت شد', 'موفق');
        this.onClear();
        this.newGate.emit(data);
      }, error => {
        this.alertService.error(error, 'خطا در ثبت درگاه پرداخت جدید');
      });
    } else {
      this.alertService.warning('اطلاعات درگاه پرداخت را به درستی وارد کنید', 'خطا');
    }
  }

}
