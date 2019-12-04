import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material';
import { BankCard } from 'src/app/data/models/bankcard';
import { BankCardsService } from 'src/app/core/_services/panel/user/bankCards.service';


@Component({
  selector: 'app-edit-bank-card',
  templateUrl: './edit-bank-card.component.html',
  styleUrls: ['./edit-bank-card.component.css']
})
export class EditBankCardComponent implements OnInit {

  @Output() newBankCard = new EventEmitter<BankCard>();
  @Output() updateBankCard = new EventEmitter<BankCard>();
  bankcard: BankCard;
  constructor( public bankCardService: BankCardsService,
              private alertService: ToastrService, private matdialogRef: MatDialogRef<EditBankCardComponent>,
              private router: Router) {}

  ngOnInit() {
  }

  onClear() {
    this.bankCardService.bankcardForm.reset();
    this.matdialogRef.close();
  }
  onSubmitAdd() {
    if (this.bankCardService.bankcardForm.valid) {
      this.bankcard = Object.assign({}, this.bankCardService.bankcardForm.value);
      if (this.addActive()) {

          this.bankCardService.addBankCard(this.bankcard).subscribe((data) => {
              this.alertService.success('کارت بانکی شما با موفقیت ثبت شد', 'موفق');
              this.alertService.info('کارت شما در انتظار تایید میباشد', 'توجه');
              this.onClear();
              this.newBankCard.emit(data);
            }, error => {
              this.alertService.error(error, 'خطا در ثبت کارت جدید');
            });
      } else {
        this.bankCardService.updateBankCard(this.bankcard).subscribe(() => {
            this.alertService.success('کارت بانکی شما با موفقیت ویرایش شد', 'موفق');
            this.alertService.info('کارت شما در انتظار تایید میباشد', 'توجه');
            this.onClear();
            this.updateBankCard.emit(this.bankcard);
          }, error => {
            this.alertService.error(error, 'خطا در ثبت کارت جدید');
          });
      }
    } else {
      this.alertService.warning('اطلاعات کارت را به درستی وارد کنید', 'خطا');
    }
  }

  addActive(): boolean {
    return (this.bankCardService.bankcardForm.get('id').value === null ||
            this.bankCardService.bankcardForm.get('id').value === undefined);
  }
}
