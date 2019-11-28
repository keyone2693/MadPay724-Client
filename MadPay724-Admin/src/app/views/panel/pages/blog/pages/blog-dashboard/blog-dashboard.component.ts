import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import * as fromStore from '../../../../../../store'
import { User } from 'src/app/data/models/user';
import { UserState } from 'src/app/store/reducers/users.reducer';

@Component({
  selector: 'app-blog-dashboard',
  templateUrl: './blog-dashboard.component.html',
  styleUrls: ['./blog-dashboard.component.css']
})
export class BlogDashboardComponent implements OnInit {

  users$: Observable<any>;
  loading$: Observable<boolean>;
  loaded$: Observable<boolean>;
  error$: Observable<string>;
  title: string;

  constructor(private store: Store<fromStore.InfoState>) { }

  ngOnInit() {
    this.loading$ = this.store.select(fromStore.getUsersLoading);
    this.loaded$ = this.store.select(fromStore.getUsersLoaded);
    this.error$ = this.store.select(fromStore.getUsersError);
    this.users$ = this.store.select(fromStore.getAllUsers);
    this.store.dispatch(new fromStore.LoadUsers());
  }
 
  resetCounter() {
    //this.store.dispatch(new TitleCounterAction.ResetCounter());
  }
}
