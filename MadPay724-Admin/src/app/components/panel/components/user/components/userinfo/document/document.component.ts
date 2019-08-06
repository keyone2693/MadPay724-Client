import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.css']
})
export class DocumentComponent implements OnInit {
  flag = true;
  constructor() {}

  ngOnInit() {
  }

  isRight(f: boolean) {
    this.flag = f;
  }
}
