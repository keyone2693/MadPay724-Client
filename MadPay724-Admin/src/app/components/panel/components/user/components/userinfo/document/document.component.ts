import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

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
}
