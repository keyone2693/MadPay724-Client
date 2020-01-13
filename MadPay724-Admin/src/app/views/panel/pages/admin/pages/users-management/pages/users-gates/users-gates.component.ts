import { Component, OnInit, OnDestroy, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Gate } from 'src/app/data/models/user/gate';
import { TableColumn } from 'simplemattable';
import { HtmlMpComponent } from 'src/app/shared/component/html-mp/html-mp.component';
import { InputMpComponent } from 'src/app/shared/component/input-mp/input-mp.component';
import { UiType } from 'src/app/data/enums/uiType.enum';
import { CheckboxMPComponent } from 'src/app/shared/component/checkbox-mp/checkbox-mp.component';
import { ButtonMPComponent } from 'src/app/shared/component/button-mp/button-mp.component';
import { ToastrService } from 'ngx-toastr';
import { Store } from '@ngrx/store';
import { Router, ActivatedRoute } from '@angular/router';
import { GatesService } from 'src/app/core/_services/panel/admin/gatesService.service';

import * as fromStore from 'src/app/store';
import { Location } from '@angular/common';

@Component({
  selector: 'app-users-gates',
  templateUrl: './users-gates.component.html',
  styleUrls: ['./users-gates.component.css']
})
export class UsersGatesComponent implements OnInit, OnDestroy {
  @ViewChild('searchKey', { static: false }) filter: ElementRef;
  subManager = new Subscription();
  gates: Gate[];

  columns = [
    new TableColumn<Gate, 'iconUrl'>('ایکن', 'iconUrl')
      .withNgComponent(HtmlMpComponent)
      .withNgComponentInput((component: HtmlMpComponent, iconUrl) => {
        component.isImage = true;
        component.text = iconUrl;
        component.class = 'img-icon';
      }),
    new TableColumn<Gate, 'id'>('شناسه', 'id')
      .withNgComponent(InputMpComponent)
      .withNgComponentInput((component: InputMpComponent, id) => {
        component.event = () => { };
        component.disabled = false;
        component.iconColor = UiType.InputInfo;
        component.text = id;
        component.isForCopy = true;
        component.icon = "ft-copy";
      }),

    new TableColumn<Gate, 'isActive'>('فعالی', 'isActive')
      .withNgComponent(CheckboxMPComponent)
      .withNgComponentInput((component: CheckboxMPComponent, isActive, gate) => {
        component.event = (data) => {
          this.onStatusChange(1, data, gate.id);
        };
        component.checked = isActive;
        component.disabled = false;
        component.type = UiType.Success;
      }),
    new TableColumn<Gate, 'isDirect'>('مستقیم', 'isDirect')
      .withNgComponent(CheckboxMPComponent)
      .withNgComponentInput((component: CheckboxMPComponent, isDirect, gate) => {
        component.event = (data) => {
          this.onStatusChange(2, data, gate.id);
        };
        component.checked = isDirect;
        component.disabled = false;
        component.type = UiType.Info;
      }),
    new TableColumn<Gate, 'isIp'>('آی پی', 'isIp')
      .withNgComponent(CheckboxMPComponent)
      .withNgComponentInput((component: CheckboxMPComponent, isIp, gate) => {
        component.event = (data) => {
          this.onStatusChange(3, data, gate.id);
        };
        component.checked = isIp;
        component.disabled = false;
        component.type = UiType.Error;
      }),
    new TableColumn<Gate, 'ip'>('آی پی', 'ip')
      .withNgComponent(InputMpComponent)
      .withNgComponentInput((component: InputMpComponent, ip) => {
        component.event = () => { };
        component.disabled = false;
        component.iconColor = UiType.InputSuccess;
        component.text = ip;
        component.isForCopy = true;
        component.icon = "ft-copy";
      }),
    new TableColumn<Gate, 'grouping'>('دسته بندی', 'grouping'),
    new TableColumn<Gate, 'websiteName'>('نام وبسایت', 'websiteName'),
    new TableColumn<Gate, 'phoneNumber'>('موبایل', 'phoneNumber'),
    new TableColumn<Gate, 'websiteUrl'>('آدرس', 'websiteUrl')
      .withNgComponent(InputMpComponent)
      .withNgComponentInput((component: InputMpComponent, websiteUrl) => {
        component.event = () => { };
        component.disabled = false;
        component.iconColor = UiType.InputSuccess;
        component.text = websiteUrl;
        component.isForCopy = true;
        component.icon = "ft-copy";
      }),
    new TableColumn<Gate, 'text'>('متن', 'text')
      .withNgComponent(HtmlMpComponent)
      .withNgComponentInput((component: HtmlMpComponent, text) => {
        component.text = text.substring(0, 10) + '...';
        component.isTooltip = true;
        component.tooltipText = text;
        component.tooltipPosition = 'below';
        component.class = 'txtwxp';
      }),
    new TableColumn<Gate, 'id'>('عملیات', 'id')
      .withNgComponent(ButtonMPComponent)
      .withNgComponentInput((component: ButtonMPComponent, id, gate) => {
        component.event = () => this.onGateFactorsClick(gate);
        component.icon = "icon-bag";
        component.text = " فاکتور ها";
        component.type = UiType.Success;
      })
  ];
  constructor(private alertService: ToastrService
    , private gateService: GatesService, private store: Store<fromStore.State>,
    private router: Router, private loc: Location, private route: ActivatedRoute) { }


  ngOnInit() {
    this.onLoadGates();
  }
  ngOnDestroy() {
    this.subManager.unsubscribe();
  }

  onLoadGates(){
    let userId = '';
    this.subManager.add(
      this.route.params.subscribe(params => {
        userId = params['userId']
      })
    )
    this.subManager.add(
      this.gateService.getUserGates(userId)
        .subscribe((data) => {
          this.gates = data;
        }, error => {
          this.alertService.error(error);
        })
    );
  }
  onStatusChange(type: number, event: any, gateId: string) {
    switch (type) {
      case 1:
        this.subManager.add(
          this.gateService.changeActiveGate(gateId, event.checked)
            .subscribe(() => {
              this.onLoadGates();
              if (event.checked === true) {
                this.alertService.success('وضعیت فاکتور تایید شد', 'موفق');
              } else {
                this.alertService.success('وضعیت فاکتور از حالت تایید خارج شد', 'موفق');
              }
            }, error => {
              this.alertService.error(error);
            })
        )
      case 2:
        this.subManager.add(
          this.gateService.changeDirectGate(gateId, event.checked)
            .subscribe(() => {
              this.onLoadGates();
              if (event.checked === true) {
                this.alertService.success('وضعیت فاکتور تایید شد', 'موفق');
              } else {
                this.alertService.success('وضعیت فاکتور از حالت تایید خارج شد', 'موفق');
              }
            }, error => {
              this.alertService.error(error);
            })
        )
      case 3:
        this.subManager.add(
          this.gateService.changeIpGate(gateId, event.checked)
            .subscribe(() => {
              this.onLoadGates();
              if (event.checked === true) {
                this.alertService.success('وضعیت فاکتور تایید شد', 'موفق');
              } else {
                this.alertService.success('وضعیت فاکتور از حالت تایید خارج شد', 'موفق');
              }
            }, error => {
              this.alertService.error(error);
            })
        )
    }

  }
  onGateFactorsClick(gate: Gate) {
    this.store.dispatch(new fromStore.EditCurrentTitle(
      { id: gate.id, title: gate.websiteName }));
    this.router.navigate(['/panel/accountant/gates', gate.id, 'factors']);
  }
  onBack() {
    this.loc.back();
  }

}
