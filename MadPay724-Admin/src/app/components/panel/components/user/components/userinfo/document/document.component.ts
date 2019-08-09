import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { Document } from 'src/app/models/document';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.css']
})
export class DocumentComponent implements OnInit {
  flag = true;
  documents: Document[];
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.loadDocuments();
  }
  loadDocuments() {
    // this.documents$ =  this.docService.getDocuments(this.authService.decodedToken.nameid);
    this.route.data.pipe(take(1)).subscribe(data => {
      this.documents = data.documents;
    });
  }
  isRight(f: boolean) {
    this.flag = f;
  }
  insertDocument(newDoc: Document) {
    this.documents.push(newDoc);
    this.goToDocList();
  }
  goToDocList() {
    $('html , body').animate({
      scrollTop: $('#doclist-place').offset().top + 20
    }, 500);
  }
  isAnyDocCheckingApprove(doc: Document) {
    return doc.approve  === 0 || doc.approve === 1;
  }
  isAnyDocChecking(doc: Document) {
    return doc.approve  === 0;
  }
  isAnyDocApprove(doc: Document) {
    return doc.approve === 1;
  }
}
