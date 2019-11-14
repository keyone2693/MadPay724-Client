import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { Subscription } from 'rxjs';
import { GatesWallets } from 'src/app/data/models/user/gatesWallets';
import { AuthService } from 'src/app/core/_services/auth/auth.service';
import { GatesService } from 'src/app/core/_services/panel/user/gateService.service';
import { GateFormComponent } from './pages/gate-form/gate-form.component';
import { Gate } from 'src/app/data/models/user/gate';

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
    if (this.gateWallets === null || this.gateWallets === undefined) {
      this.alertService.error(' برای دسترسی به این بخش باید مدارک شما ارسال و تایید شده باشد '
        + ' برای بررسی مدارک به '
        + ' صفحه ارسال '
        + ' مراجعه کنید !!! ', 'توجه');
    } else {
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

  }
  insertBankCard(gate: Gate) {
    this.gateWallets.gates.push(gate);
  }
}
