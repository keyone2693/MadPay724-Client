import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-right-document',
  templateUrl: './right-document.component.html',
  styleUrls: ['./right-document.component.css']
})
export class RightDocumentComponent implements OnInit {

  constructor(private formBuilder: FormBuilder) { }
  docRightForm: FormGroup;

  ngOnInit() {
    this.docRightForm = this.formBuilder.group({
      id: [],
      isTrue: [true],
      name: ['', [Validators.required, Validators.maxLength(100)]],
      nationalCode: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(10)]],
      fatherNameRegisterCode: ['', [Validators.required, Validators.maxLength(100)]],
      birthDay: ['', [Validators.required]],
      address: ['', [Validators.required, Validators.maxLength(100)]]
    });
  }

}
