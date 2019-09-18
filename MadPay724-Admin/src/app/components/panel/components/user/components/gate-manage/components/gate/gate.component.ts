import { Component, OnInit, Input } from '@angular/core';
import { Gate } from 'src/app/models/user/gate';
import { Wallet } from 'src/app/models/wallet';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { GateActiveComponent } from '../gate-active/gate-active.component';
import { GateWallets } from 'src/app/models/user/gateWallets';

@Component({
  selector: 'app-gate',
  templateUrl: './gate.component.html',
  styleUrls: ['./gate.component.css']
})
export class GateComponent implements OnInit {
  @Input() gate: Gate;
  @Input() wallets: Wallet[];
  constructor(private dialog: MatDialog) { }

  ngOnInit() {
  }
  getGateWallet(id: string): Wallet {
    return this.wallets.find(p => p.id === id);
  }
  onActiveDialo() {
    const dialogConfig = new MatDialogConfig ();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {gate: this.gate, wallets: this.wallets};

    const dialogRef = this.dialog.open(GateActiveComponent, dialogConfig);
    const sub = dialogRef.componentInstance.activeFlag.subscribe((data) => {
      this.gate.isActive = data;
    });
    dialogRef.afterClosed().subscribe(() => {
      sub.unsubscribe();
    });

  }
}
