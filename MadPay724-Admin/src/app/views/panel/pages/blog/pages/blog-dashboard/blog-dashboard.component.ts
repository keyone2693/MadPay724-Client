import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import * as fromStore from '../../../../../../store'
import { UserState } from 'src/app/store/reducers/users.reducer';
import { User } from 'src/app/data/models/user';

@Component({
  selector: 'app-blog-dashboard',
  templateUrl: './blog-dashboard.component.html',
  styleUrls: ['./blog-dashboard.component.css']
})
export class BlogDashboardComponent implements OnInit {

  users$: Observable<User[]>;
  title: string;

  constructor(private store: Store<fromStore.InfoState>) { }

  ngOnInit() {
    this.users$ = this.store.select(fromStore.getAllUsers);
    
  }
 
  resetCounter() {
    //this.store.dispatch(new TitleCounterAction.ResetCounter());
  }
}
