import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { GateActiveComponent } from '../gate-active/gate-active.component';
import { Gate } from 'src/app/data/models/user/gate';
import { Wallet } from 'src/app/data/models/wallet';

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
  onActiveDialo(direct: boolean) {
    const dialogConfig = new MatDialogConfig ();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = { gate: this.gate, wallets: this.wallets, isDirect: direct };

    const dialogRef = this.dialog.open(GateActiveComponent, dialogConfig);
    const sub = dialogRef.componentInstance.activeFlag.subscribe((data) => {
      this.gate.isDirect = data;
    });
    dialogRef.afterClosed().subscribe(() => {
      sub.unsubscribe();
    });

  }
}
