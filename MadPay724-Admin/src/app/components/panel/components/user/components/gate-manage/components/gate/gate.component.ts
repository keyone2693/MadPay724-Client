import { Component, OnInit, Input } from '@angular/core';
import { Gate } from 'src/app/models/user/gate';
import { Wallet } from 'src/app/models/wallet';

@Component({
  selector: 'app-gate',
  templateUrl: './gate.component.html',
  styleUrls: ['./gate.component.css']
})
export class GateComponent implements OnInit {
  @Input() gate: Gate;
  @Input() wallets: Wallet[];
  constructor() { }

  ngOnInit() {
  }
  getGateWallet(id: string): Wallet {
    return this.wallets.find(p => p.id === id);
}
}
