import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DocumentService } from 'src/app/Services/panel/user/document.service';
import { AuthService } from 'src/app/Services/auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';


@Component({
  selector: 'app-left-document',
  templateUrl: './left-document.component.html',
  styleUrls: ['./left-document.component.css']
})
export class LeftDocumentComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private docService: DocumentService,
              private authService: AuthService, private alertService: ToastrService) { }
  docLeftForm: FormGroup;
  slectedFile: File;
  imgUrl = '../../../../../../../../../../assets/img/profilepic.png';

  ngOnInit() {
    this.docLeftForm = this.formBuilder.group({
      isTrue: [false],
      name: ['', [Validators.required, Validators.maxLength(100)]],
      nationalCode: ['', [Validators.required, Validators.maxLength(100)]],
      fatherNameRegisterCode: ['', [Validators.required, Validators.maxLength(100)]],
      birthDay: ['', [Validators.required]],
      address: ['', [Validators.required, Validators.maxLength(100)]],
      file: [null, [Validators.required]],
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
  onSubmit() {
    const m = moment();
    const document = new FormData();
    // document = Object.assign({}, this.docLeftForm.value);
    document.append('file', this.slectedFile, this.slectedFile.name);
    document.append('isTrue', this.docLeftForm.get('isTrue').value);
    document.append('name', this.docLeftForm.get('name').value);
    document.append('nationalCode', this.docLeftForm.get('nationalCode').value);
    document.append('fatherNameRegisterCode', this.docLeftForm.get('fatherNameRegisterCode').value);
    document.append('birthDay', moment(this.docLeftForm.get('birthDay').value)
    .format('YYYY/MM/DD HH:mm:ss'));
    document.append('address', this.docLeftForm.get('address').value);


    this.docService.addDocument(this.authService.decodedToken.nameid, document).subscribe((data) => {
      this.alertService.success('مدارک شما با موفقیت ارسال شد', 'موفق');
      this.alertService.info('مدارک شما در انتظار تایید میباشد', 'توجه');
      this.docLeftForm.reset();
    }, error => {
      this.alertService.error(error, 'خطا');
    });
  }

}
