import { Component, OnInit, Input } from '@angular/core';
import { Gate } from 'src/app/models/user/gate';

@Component({
  selector: 'app-gate',
  templateUrl: './gate.component.html',
  styleUrls: ['./gate.component.css']
})
export class GateComponent implements OnInit {
  @Input() gate: Gate;
  constructor() { }

  ngOnInit() {
  }

}
