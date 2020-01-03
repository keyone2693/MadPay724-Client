import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { Factor } from 'src/app/data/models/accountant/factor';
import { FactorService } from 'src/app/core/_services/panel/accountant/factor.service';
import { Location } from '@angular/common';

import 'src/app/shared/extentions/number.extentions'
import { FactorDetail } from 'src/app/data/models/accountant/factorDetail';

@Component({
  selector: 'app-factor-edit',
  templateUrl: './factor-edit.component.html',
  styleUrls: ['./factor-edit.component.css']
})
export class FactorEditComponent implements OnInit, OnDestroy {
  subManager = new Subscription();
  factorDetail: FactorDetail;
  factorEditForm: FormGroup = this.formBuilder.group({
    refBank: ['', [Validators.required, Validators.maxLength(500)]],
  })
  constructor(private route: ActivatedRoute, private title: Title,
    private formBuilder: FormBuilder, private alertService: ToastrService,
    private factorSerrvice: FactorService, private router: Router, private loc: Location) { }

  ngOnInit() {
    this.loadFactor();
    this.title.setTitle('ویرایش،جزییات فاکتور ' + this.factorDetail.factor.userName);
    this.populateForm();
  }
  loadFactor() {
    this.subManager.add(
      this.route.data.subscribe(data => {
        this.factorDetail = data.factorDetail;
      })
    );
  }
  populateForm() {
    this.factorEditForm.setValue({
      refBank: this.factorDetail.factor.refBank
    });
  }
  ngOnDestroy() {
    this.subManager.unsubscribe();
  }
  onClear() {
    this.loc.back();
  }
  onSubmitEditFactor() {
    if (this.factorEditForm.valid) {
      const factorForUpdate = Object.assign({}, this.factorEditForm.value)
      this.subManager.add(
        this.factorSerrvice.updateFactor(this.factorDetail.factor.id, factorForUpdate).subscribe((data) => {
          this.alertService.success('فاکتور ویرایش شد', 'موفق');
          this.onClear();
        }, error => {
          this.alertService.error(error, 'ناموفق');
        })
      );
    } else {
      this.alertService.warning('اطلاعات را به درستی وارد کنید !', 'هشدار')
    }
  }
  onStatusChange(event: any, factorId: string) {
    this.subManager.add(
      this.factorSerrvice.changeStatusFactor(factorId, event.checked)
        .subscribe(data => {
          this.factorDetail.factor.status = event.checked;
          this.factorDetail.wallet = data;
          if (event.checked === true) {
            this.alertService.success('وضعیت فاکتور تایید شد', 'موفق');
          } else {
            this.alertService.success('وضعیت فاکتور از حالت تایید خارج شد', 'موفق');
          }
        }, error => {
          this.alertService.error(error);
        })
    )
  }

}
