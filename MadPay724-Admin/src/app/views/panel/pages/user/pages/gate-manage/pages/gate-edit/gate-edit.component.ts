import {  OnInit, OnDestroy, Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GateWallets } from 'src/app/data/models/user/gateWallets';
import { GatesService } from 'src/app/core/_services/panel/user/gateService.service';
import { AuthService } from 'src/app/core/_services/auth/auth.service';

@Component({
  selector: 'app-gate-edit',
  templateUrl: './gate-edit.component.html',
  styleUrls: ['./gate-edit.component.css']
})
export class GateEditComponent implements OnInit, OnDestroy {
  gatewallets: GateWallets;
  subManager = new Subscription();
  slectedFile: File;
  imgUrl: string;

  constructor(private gateService: GatesService, private authService: AuthService,
    private alertService: ToastrService, private route: ActivatedRoute,
    private formBuilder: FormBuilder, private router: Router) { }

  gateForm: FormGroup = this.formBuilder.group({
    walletId: ['', [Validators.required]],
    isIp: [false, [Validators.required]],
    websiteName: ['', [Validators.required, Validators.maxLength(100)]],
    websiteUrl: ['', [Validators.required, Validators.maxLength(500),
    Validators.pattern('(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})')]],
    phoneNumber: ['', [Validators.required, Validators.maxLength(50)]],
    text: ['', [Validators.required, Validators.maxLength(1000)]],
    grouping: ['', [Validators.required, Validators.maxLength(50)]],
    file: [null],
  });


  ngOnInit() {
    this.subManager.add(
      this.route.data.subscribe(data => {
        this.gatewallets = data['gatewallets'];
      })
    );
    this.imgUrl = this.gatewallets.gate.iconUrl;
    this.createGateForm();
  }
  ngOnDestroy() {
    this.subManager.unsubscribe();
  }
  onEdit() {
    const gateForm = new FormData();
    if (this.slectedFile != null || this.slectedFile !== undefined) {
      gateForm.append('file', this.slectedFile, this.slectedFile.name);
    }
    gateForm.append('walletId', this.gateForm.get('walletId').value);
    gateForm.append('isIp', this.gateForm.get('isIp').value);
    gateForm.append('websiteName', this.gateForm.get('websiteName').value);
    gateForm.append('websiteUrl', this.gateForm.get('websiteUrl').value);
    gateForm.append('phoneNumber', this.gateForm.get('phoneNumber').value);
    gateForm.append('text', this.gateForm.get('text').value);
    gateForm.append('grouping', this.gateForm.get('grouping').value);

    if (this.gateForm.valid) {
      this.gateService.updateGate(gateForm, this.authService.decodedToken.nameid, this.gatewallets.gate.id)
        .subscribe(() => {
          this.alertService.success(' درگاه پرداخت شما با موفقیت ویرایش شد', 'موفق');
          this.onClear();
        }, error => {
          this.alertService.error(error, 'خطا در ویرایش درگاه پرداخت جدید');
        });
    } else {
      this.alertService.warning('اطلاعات درگاه پرداخت را به درستی وارد کنید', 'خطا');
    }
  }
  createGateForm() {
    this.gateForm.setValue({
      walletId: this.gatewallets.gate.walletId,
      isIp: this.gatewallets.gate.isIp,
      websiteName: this.gatewallets.gate.websiteName,
      websiteUrl: this.gatewallets.gate.websiteUrl,
      phoneNumber: this.gatewallets.gate.phoneNumber,
      text: this.gatewallets.gate.text,
      grouping: this.gatewallets.gate.grouping,
      file: null
    });
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
  onClear() {
    this.router.navigate(['/panel/user/gate']);
  }
}
