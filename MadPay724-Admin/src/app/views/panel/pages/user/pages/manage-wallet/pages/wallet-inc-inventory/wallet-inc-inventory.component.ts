import { Component, OnInit, Inject } from '@angular/core';
import { WalletService } from 'src/app/core/_services/panel/user/wallet.service';
import { Wallet } from 'src/app/data/models/wallet';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-wallet-inc-inventory',
  templateUrl: './wallet-inc-inventory.component.html',
  styleUrls: ['./wallet-inc-inventory.component.css']
})
export class WalletIncInventoryComponent implements OnInit {
  wallet: Wallet;
  constructor(public walletService: WalletService,
    private alertService: ToastrService, private matdialogRef: MatDialogRef<WalletIncInventoryComponent>,
    private router: Router, @Inject(MAT_DIALOG_DATA) private data: Wallet,
    private formBuilder: FormBuilder, private ngxService: NgxUiLoaderService) { }

  walletForm: FormGroup = this.formBuilder.group({
    walletId: ['', Validators.required],
    price: [2000, [Validators.required, Validators.maxLength(20)]]
  });
  ngOnInit() {
    this.wallet = this.data;
    this.walletForm.get('walletId').setValue(this.wallet.id);
  }
  onClear() {
    this.matdialogRef.close();
  }
  onSubmit() {
    const id = this.walletForm.get('walletId').value;
    const price = this.walletForm.get('price').value;
    this.walletService.getBankGate(id, price).subscribe((data) => {
      this.ngxService.start();
      window.location.href = data.result;
    }, error => {
      this.alertService.error(error, 'خطا در ثبت کیف پول جدید');
    });
  }

}
