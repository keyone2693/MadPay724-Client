import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { HelloMessageState } from 'src/app/store/helloMessage/helloMessageState';

@Component({
  selector: 'app-blog-dashboard',
  templateUrl: './blog-dashboard.component.html',
  styleUrls: ['./blog-dashboard.component.css']
})
export class BlogDashboardComponent implements OnInit {

  helloMessage$: Observable<string>;

  constructor(private store: Store<HelloMessageState>) { }

  ngOnInit() {
    this.helloMessage$ = this.store.select('helloMessage');
  }
  onPersian() {
    this.store.dispatch({ type: 'PERSIAN' });
  }
  onEnglish() {
    this.store.dispatch({ type: 'ENGLISH' });
  }

}
