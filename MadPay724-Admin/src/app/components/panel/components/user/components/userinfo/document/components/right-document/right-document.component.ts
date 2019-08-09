import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/Services/auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { DocumentService } from 'src/app/Services/panel/user/document.service';
import * as moment from 'moment';

@Component({
  selector: 'app-right-document',
  templateUrl: './right-document.component.html',
  styleUrls: ['./right-document.component.css']
})
export class RightDocumentComponent implements OnInit {


  constructor(private formBuilder: FormBuilder, private docService: DocumentService,
              private authService: AuthService, private alertService: ToastrService) { }
  docRightForm: FormGroup;
  slectedFile: File;
  imgUrl = '../../../../../../../../../../assets/img/profilepic.png';

  ngOnInit() {
    this.docRightForm = this.formBuilder.group({
      isTrue: [true],
      name: ['', [Validators.required, Validators.maxLength(100)]],
      nationalCode: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(10)]],
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
    document.append('isTrue', this.docRightForm.get('isTrue').value);
    document.append('name', this.docRightForm.get('name').value);
    document.append('nationalCode', this.docRightForm.get('nationalCode').value);
    document.append('fatherNameRegisterCode', this.docRightForm.get('fatherNameRegisterCode').value);
    document.append('birthDay', moment(this.docRightForm.get('birthDay').value)
      .format('YYYY/MM/DD HH:mm:ss'));
    document.append('address', this.docRightForm.get('address').value);


    this.docService.addDocument(this.authService.decodedToken.nameid, document).subscribe((data) => {
      this.alertService.success('مدارک شما با موفقیت ارسال شد', 'موفق');
      this.alertService.info('مدارک شما در انتظار تایید میباشد', 'توجه');
      this.docRightForm.reset();
    }, error => {
      this.alertService.error(error, 'خطا');
    });
  }
}
