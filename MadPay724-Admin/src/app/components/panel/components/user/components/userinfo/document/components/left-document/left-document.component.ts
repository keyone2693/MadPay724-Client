import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DocumentService } from 'src/app/Services/panel/user/document.service';
import { AuthService } from 'src/app/Services/auth/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-left-document',
  templateUrl: './left-document.component.html',
  styleUrls: ['./left-document.component.css']
})
export class LeftDocumentComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private docService: DocumentService,
              private authService: AuthService, private alertService: ToastrService) { }
  docLeftForm: FormGroup;
  slectedFile = null;

  ngOnInit() {
    this.docLeftForm = this.formBuilder.group({
      isTrue: [true],
      name: ['', [Validators.required, Validators.maxLength(100)]],
      nationalCode: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(10)]],
      fatherNameRegisterCode: ['', [Validators.required, Validators.maxLength(100)]],
      birthDay: ['', [Validators.required]],
      address: ['', [Validators.required, Validators.maxLength(100)]]
    });
  }
  onFileSelect(event) {
    this.slectedFile = event.target.files[0];
  }
  onSubmit() {
    let document = new FormData();
    document = Object.assign({}, this.docLeftForm.value);
    document.append('file', this.slectedFile, this.slectedFile.name);
    this.docService.addDocument(this.authService.decodedToken.nameid, document).subscribe((data) => {
      this.alertService.success('مدارک شما با موفقیت ارسال شد', 'موفق');
      this.alertService.success('مدارک شما در انتظار تایید میباشد', 'توجه');
    }, error => {
      this.alertService.error(error, 'خطا');
    });
  }
}
