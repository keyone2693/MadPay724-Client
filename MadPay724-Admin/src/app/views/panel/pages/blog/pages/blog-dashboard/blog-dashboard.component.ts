import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { HelloMessage } from 'src/app/store/helloMessage/helloMessage';
import * as TitleCounterAction from '../../../../../../store/titleCounter/titleCounter.action';
import { TitleCounter } from 'src/app/store/titleCounter/titleCounter';

interface AppState {
  helloMessage: HelloMessage,
  titleCounter: TitleCounter
}

@Component({
  selector: 'app-blog-dashboard',
  templateUrl: './blog-dashboard.component.html',
  styleUrls: ['./blog-dashboard.component.css']
})
export class BlogDashboardComponent implements OnInit {

  helloMessage$: Observable<HelloMessage>;
  titleCounter$: Observable<TitleCounter>;
  title: string;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.helloMessage$ = this.store.select('helloMessage');
    this.titleCounter$ = this.store.select('titleCounter');
  }
  onPersian() {
    this.store.dispatch({ type: 'PERSIAN' });
  }
  onEnglish() {
    this.store.dispatch({ type: 'ENGLISH' });
  }
  editTitle() {
    this.store.dispatch(new TitleCounterAction.EditTitle(this.title));
  }
  increaseCounter() {
    this.store.dispatch(new TitleCounterAction.IncreaseCounter());
  }
  decreaseCounter() {
    this.store.dispatch(new TitleCounterAction.DecreaseCounter());
  }
  resetCounter() {
    this.store.dispatch(new TitleCounterAction.ResetCounter());
  }
}
