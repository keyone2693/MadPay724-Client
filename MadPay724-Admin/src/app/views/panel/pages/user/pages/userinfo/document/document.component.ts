import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Document } from 'src/app/data/models/document';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.css']
})
export class DocumentComponent implements OnInit, OnDestroy {
  flag = true;
  documents: Document[];
  subManager = new Subscription();
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.loadDocuments();
  }
  ngOnDestroy() {
    this.subManager.unsubscribe();
  }
  loadDocuments() {
    // this.documents$ =  this.docService.getDocuments(this.authService.decodedToken.nameid);
    this.subManager.add(this.route.data.subscribe(data => {
      this.documents = data.documents;
    })
    );
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
    return doc.approve === 0 || doc.approve === 1;
  }
  isAnyDocChecking(doc: Document) {
    return doc.approve === 0;
  }
  isAnyDocApprove(doc: Document) {
    return doc.approve === 1;
  }
}
