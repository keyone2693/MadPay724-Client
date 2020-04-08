import { Component, OnInit, Output, EventEmitter, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Gate } from 'src/app/data/models/user/gate';
import { GatesService } from 'src/app/core/_services/panel/user/gateService.service';
import { Wallet } from 'src/app/data/models/wallet';

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
  imgUrl = './assets/img/logos/logo-gate.png';
  constructor( public gateService: GatesService,
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
    const gateForm = new FormData();
    // document = Object.assign({}, this.docLeftForm.value);
    gateForm.append('file', this.slectedFile, this.slectedFile.name);
    gateForm.append('walletId', this.gateService.gateForm.get('walletId').value);
    gateForm.append('isIp', this.gateService.gateForm.get('isIp').value);
    gateForm.append('websiteName', this.gateService.gateForm.get('websiteName').value);
    gateForm.append('websiteUrl', this.gateService.gateForm.get('websiteUrl').value);
    gateForm.append('phoneNumber', this.gateService.gateForm.get('phoneNumber').value);
    gateForm.append('text', this.gateService.gateForm.get('text').value);
    gateForm.append('grouping', this.gateService.gateForm.get('grouping').value);

    if (this.gateService.gateForm.valid) {
      this.gateService.addGate(gateForm).subscribe((data) => {
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
