import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { FactorDetail } from 'src/app/data/models/accountant/factorDetail';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Location } from '@angular/common';
import 'src/app/shared/extentions/number.extentions'

@Component({
  selector: 'app-user-gate-factor-detail',
  templateUrl: './user-gate-factor-detail.component.html',
  styleUrls: ['./user-gate-factor-detail.component.css']
})
export class UserGateFactorDetailComponent implements OnInit, OnDestroy {
  subManager = new Subscription();
  factorDetail: FactorDetail;
  constructor(private route: ActivatedRoute, private title: Title,private loc: Location) { }

  ngOnInit() {
    this.loadFactor();
    this.title.setTitle('ویرایش،جزییات فاکتور ' + this.factorDetail.factor.userName);
  }
  loadFactor() {
    this.subManager.add(
      this.route.data.subscribe(data => {
        this.factorDetail = data.factorDetail;
      })
    );
  }

  ngOnDestroy() {
    this.subManager.unsubscribe();
  }
  onClear() {
    this.loc.back();
  }

}
