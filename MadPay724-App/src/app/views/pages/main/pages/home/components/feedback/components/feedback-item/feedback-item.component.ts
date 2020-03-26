import { Component, OnInit, Input } from '@angular/core';
import { FeedBack } from 'src/app/data/models/home/feedBack';

@Component({
  selector: 'app-feedback-item',
  templateUrl: './feedback-item.component.html',
  styleUrls: ['./feedback-item.component.css']
})
export class FeedbackItemComponent implements OnInit {
  @Input() feedBack: FeedBack;
  constructor() { }

  ngOnInit() {
  }

}
