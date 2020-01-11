import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { GateActiveComponent } from '../gate-active/gate-active.component';
import { Gate } from 'src/app/data/models/user/gate';
import { Wallet } from 'src/app/data/models/wallet';

import * as fromStore from '../../../../../../../../store';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';


@Component({
  selector: 'app-gate',
  templateUrl: './gate.component.html',
  styleUrls: ['./gate.component.css']
})
export class GateComponent implements OnInit {
  @Input() gate: Gate;
  @Input() wallets: Wallet[];
  constructor(private dialog: MatDialog,private router:Router,
    private store: Store<fromStore.State>) { }

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

  onGateFactorsClick(gate: Gate) {
    this.store.dispatch(new fromStore.EditCurrentTitle(
      { id: gate.id, title: gate.websiteName }));
    this.router.navigate(['/panel/user/gate', gate.id, 'factors']);
  }
}
