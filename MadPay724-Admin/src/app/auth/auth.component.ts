import { Component, OnInit } from '@angular/core';
import { fadeAnimation } from '../common/animation';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
  animations: [fadeAnimation]
})
export class AuthComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
