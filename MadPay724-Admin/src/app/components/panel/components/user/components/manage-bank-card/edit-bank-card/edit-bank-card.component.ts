import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BankCardsService } from 'src/app/Services/panel/user/bankCards.service';
import { BankCard } from 'src/app/models/bankcard';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth/auth.service';
import { MatDialogRef } from '@angular/material';


@Component({
  selector: 'app-edit-bank-card',
  templateUrl: './edit-bank-card.component.html',
  styleUrls: ['./edit-bank-card.component.css']
})
export class EditBankCardComponent implements OnInit {

  @Output() newBankCard = new EventEmitter<BankCard>();
  bankcard: BankCard;
  constructor(private authService: AuthService, public bankCardService: BankCardsService,
              private alertService: ToastrService, private matdialogRef: MatDialogRef<EditBankCardComponent>,
              private router: Router) { }

  ngOnInit() {
  }

  onClear() {
    this.bankCardService.bankcardForm.reset();
    this.matdialogRef.close();
  }
  onSubmitAdd() {
    if (this.bankCardService.bankcardForm.valid) {
      this.bankcard = Object.assign({}, this.bankCardService.bankcardForm.value);
      this.bankCardService.addBankCard(this.bankcard, this.authService.decodedToken.nameid).subscribe((data) => {
        this.alertService.success('کارت بانکی شما با موفقیت ثبت شد', 'موفق');
        this.alertService.info('کارت شما در انتظار تایید میباشد', 'توجه');
        this.onClear();
        this.newBankCard.emit(data);
      }, error => {
        this.alertService.error(error, 'خطا در ثبت کارت جدید');
      });
    } else {
      this.alertService.warning('اطلاعات کارت را به درستی وارد کنید', 'خطا');
    }
  }
}
