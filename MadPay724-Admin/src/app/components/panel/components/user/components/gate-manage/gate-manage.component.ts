import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/Services/auth/auth.service';
import { Wallet } from 'src/app/models/wallet';
import { GateFormComponent } from './components/gate-form/gate-form.component';
import { Gate } from 'src/app/models/user/gate';
import { GatesService } from 'src/app/Services/panel/user/gateService.service';
import { GatesWallets } from 'src/app/models/user/gatesWallets';

@Component({
  selector: 'app-gate-manage',
  templateUrl: './gate-manage.component.html',
  styleUrls: ['./gate-manage.component.css']
})
export class GateManageComponent implements OnInit, OnDestroy {
  gateWallets: GatesWallets;
  subManager = new Subscription();
  constructor(private dialog: MatDialog, private route: ActivatedRoute, private alertService: ToastrService,
              private gateService: GatesService, private authService: AuthService) { }

  ngOnInit() {
    this.loadGates();
  }
  ngOnDestroy() {
    this.subManager.unsubscribe();
  }
  loadGates() {
    this.route.data.subscribe(data => {
      this.gateWallets = data.gateswallets;
    });
  }
  onCreate() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = this.gateWallets.wallets;
    const dialogRef = this.dialog.open(GateFormComponent, dialogConfig);
    const sub = dialogRef.componentInstance.newGate.subscribe((data) => {
      this.insertBankCard(data);
    });
    dialogRef.afterClosed().subscribe(() => {
      sub.unsubscribe();
    });
  }
  insertBankCard(gate: Gate) {
    this.gateWallets.gates.push(gate);
  }
}
