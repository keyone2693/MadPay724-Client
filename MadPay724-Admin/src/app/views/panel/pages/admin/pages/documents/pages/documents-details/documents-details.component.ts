import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Title } from '@angular/platform-browser';
import { Location } from '@angular/common';
import { Document } from 'src/app/data/models/document';
import { DocumentService } from 'src/app/core/_services/panel/admin/document.service';

@Component({
  selector: 'app-documents-details',
  templateUrl: './documents-details.component.html',
  styleUrls: ['./documents-details.component.css']
})
export class DocumentsDetailsComponent implements OnInit, OnDestroy {
  subManager = new Subscription();
  document: Document;
  documentEditForm: FormGroup = this.formBuilder.group({
    approve: ['', [Validators.required]],
    message: ['', [Validators.required, Validators.maxLength(100)]],
  })
  constructor(private route: ActivatedRoute, private title: Title,
    private formBuilder: FormBuilder, private alertService: ToastrService,
    private documentSerrvice: DocumentService , private router: Router , private loc: Location) { }

  ngOnInit() {
    this.loadDocument();
    this.title.setTitle('ویرایش،جزییات مدرک ' + this.document.name);
    this.populateForm();
  }
  loadDocument() {
    this.subManager.add(
      this.route.data.subscribe(data => {
        this.document = data.document;
      })
    );
  }
  populateForm() {
    this.documentEditForm.setValue({
      approve: this.document.approve,
      message: this.document.message
    });
  }
  ngOnDestroy() {
    this.subManager.unsubscribe();
  }
  onClear() {
    this.loc.back();
  }
  onSubmitEditDocument() {
    if (this.documentEditForm.valid) {
      const documentForUpdate = Object.assign({}, this.documentEditForm.value)
      this.subManager.add(
        this.documentSerrvice.updateDocument(this.document.id, documentForUpdate).subscribe(() => {
          this.alertService.success('مدرک ویرایش شد', 'موفق');
          this.onClear();
        }, error => {
          this.alertService.error(error, 'ناموفق');
        })
      );
    } else {
      this.alertService.warning('اطلاعات را به درستی وارد کنید !', 'هشدار')
    }
  }
}
