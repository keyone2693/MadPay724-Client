import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.css']
})
export class DocumentComponent implements OnInit {

  constructor(private title: Title) {
    this.title.setTitle('ارسال مدارک شناسایی');
   }

  ngOnInit() {
  }

}
