import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import * as fromStore from '../../../../../../store'
import { UserState } from 'src/app/store/reducers/users.reducer';

@Component({
  selector: 'app-blog-dashboard',
  templateUrl: './blog-dashboard.component.html',
  styleUrls: ['./blog-dashboard.component.css']
})
export class BlogDashboardComponent implements OnInit {

  users$: Observable<UserState>;
  title: string;

  constructor(private store: Store<fromStore.InfoState>) { }

  ngOnInit() {
    this.store.select('users').subscribe(state => {
      console.log(state);
    });
    
  }
 
  resetCounter() {
    //this.store.dispatch(new TitleCounterAction.ResetCounter());
  }
}
