import { Component, OnInit } from '@angular/core';
import { EasyPayService } from 'src/app/Services/panel/user/easyPay.service';
import { AuthService } from 'src/app/Services/auth/auth.service';
import { Gate } from 'src/app/models/user/gate';
import { Wallet } from 'src/app/models/wallet';

@Component({
  selector: 'app-easypay-form',
  templateUrl: './easypay-form.component.html',
  styleUrls: ['./easypay-form.component.css']
})
export class EasypayFormComponent implements OnInit {
  gates: Gate[];
  wallets: Wallet[];
  constructor(public easypaySerice: EasyPayService, private authService: AuthService) { }

  ngOnInit() {
  }

}
