import { Component, OnInit } from '@angular/core';
import { DocumentService } from 'src/app/Services/panel/user/document.service';
import { AuthService } from 'src/app/Services/auth/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {

  documents$: Observable<Document[]>;

  constructor(private docService: DocumentService, private authService: AuthService) { }

  ngOnInit() {
    this.loadDocuments();
  }
  loadDocuments() {
    this.documents$ =  this.docService.getDocuments(this.authService.decodedToken.nameid);
  }
}
