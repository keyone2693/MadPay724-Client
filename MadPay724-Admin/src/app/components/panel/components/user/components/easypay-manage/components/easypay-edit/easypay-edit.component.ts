import { Component, OnInit, OnDestroy } from '@angular/core';
import { EasyPayGatesWallets } from 'src/app/models/user/easyPayGatesWallets';
import { AuthService } from 'src/app/Services/auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-easypay-edit',
  templateUrl: './easypay-edit.component.html',
  styleUrls: ['./easypay-edit.component.css']
})
export class EasypayEditComponent implements OnInit, OnDestroy {
  easypayGatesWallets: EasyPayGatesWallets;
  subManager = new Subscription();

  constructor(private authService: AuthService,
    private alertService: ToastrService, private route: ActivatedRoute,
     private router: Router) { }

  ngOnInit() {
    this.subManager.add(
      this.route.data.subscribe(data => {
        this.easypayGatesWallets = data['easypayGatesWallets'];
      })
    );
  }
  ngOnDestroy() {
    this.subManager.unsubscribe();
  }

}
