import { Component, OnInit, Input } from '@angular/core';
import { FeedBack } from 'src/app/data/models/home/feedBack';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {
  @Input() feedBacks: FeedBack[];
  constructor() { }

  ngOnInit() {
  }

}
