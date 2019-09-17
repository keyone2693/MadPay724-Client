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
  gateForm: FormGroup;
  imgUrl: string;

  constructor(private gateService: GatesService, private authService: AuthService,
              private alertService: ToastrService, private route: ActivatedRoute,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.loadGate();
    this.imgUrl = this.gatewallets.gates.iconUrl;
    this.createGateForm();
  }
  ngOnDestroy() {
    this.subManager.unsubscribe();
  }
  createGateForm() {
    this.gateForm = this.formBuilder.group({
      walletId: [this.gatewallets.gates.walletId, [Validators.required]],
      isIp: [this.gatewallets.gates.isIp, [Validators.required]],
      websiteName: [this.gatewallets.gates.websiteName, [Validators.required, Validators.maxLength(100)]],
      websiteUrl: [this.gatewallets.gates.websiteUrl, [Validators.required, Validators.maxLength(500),
      Validators.pattern('(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})')]],
      phoneNumber: [this.gatewallets.gates.phoneNumber, [Validators.required, Validators.maxLength(50)]],
      text: [this.gatewallets.gates.text, [Validators.required, Validators.maxLength(1000)]],
      grouping: [this.gatewallets.gates.grouping, [Validators.required, Validators.maxLength(50)]],
      file: [null, [Validators.required]],
    });
  }
  loadGate() {
    this.subManager.add(
      this.gateService.getGate(this.authService.decodedToken.nameid, this.route.snapshot.params['gateId'])
        .subscribe((gw: GateWallets) => {
          this.gatewallets = gw;
        }, error => {
          this.alertService.error(error);
        })
    );
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
