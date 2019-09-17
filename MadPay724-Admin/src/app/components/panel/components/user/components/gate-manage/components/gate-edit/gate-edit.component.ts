import { Component, OnInit, OnDestroy } from '@angular/core';
import { GatesService } from 'src/app/Services/panel/user/gateService.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/Services/auth/auth.service';
import { GateWallets } from 'src/app/models/user/gateWallets';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

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
              private formBuilder: FormBuilder) { }

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
  }
}
