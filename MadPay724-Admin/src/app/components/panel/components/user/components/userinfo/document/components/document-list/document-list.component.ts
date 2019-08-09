import { Component, OnInit, Input } from '@angular/core';
import { DocumentService } from 'src/app/Services/panel/user/document.service';
import { AuthService } from 'src/app/Services/auth/auth.service';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Document } from 'src/app/models/document';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {
  @Input() documents: Document[];

  constructor(private docService: DocumentService, private authService: AuthService
              ) { }

  ngOnInit() {
  }
}
