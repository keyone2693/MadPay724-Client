import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { BankCard } from 'src/app/models/bankcard';
import { BankCardsService } from 'src/app/Services/panel/user/bankCards.service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { EditBankCardComponent } from '../edit-bank-card/edit-bank-card.component';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/Services/auth/auth.service';

@Component({
  selector: 'app-bank-card',
  templateUrl: './bank-card.component.html',
  styleUrls: ['./bank-card.component.css']
})
export class BankCardComponent implements OnInit {
  @Input() bankcard: BankCard;
  @Output() deleteBankCard = new EventEmitter<BankCard>();
  approve: boolean;
  constructor(private authService: AuthService, private banCardSercise: BankCardsService,
    private dialog: MatDialog, private alertService: ToastrService) { }

  ngOnInit() {
    this.approve = true;
  }

  getBankName(bn: string): string {
    switch (bn) {
      case 'bsi': return 'بانک صادرات';
      case 'mellat': return 'بانک ملت';
      case 'tejarat': return 'بانک تجارت';
      case 'bmi': return 'بانک ملی ایران';
      case 'sepah': return 'بانک سپه';
      case 'bki': return 'بانک کشاورزی';
      case 'parsian': return 'بانک پارسیان';
      case 'maskan': return 'بانک مسکن';
      case 'rb': return 'بانک رفاه کارگران';
      case 'en': return 'بانک اقتصاد نوین';
      case 'post': return 'بانک پست بانک';
      case 'sina': return 'بانک سینا';
      case 'bpi': return 'بانک سامان';
      case 'bpi': return 'بانک پاسارگاد';
      case 'ansar': return 'بانک انصار';
      case 'sarmayeh': return 'بانک سرمایه';
      case 'ba': return 'بانک آینده';
      case 'shahr': return 'بانک شهر';
      case 'tt': return 'بانک توسعه تعاون';
      case 'ghbi': return 'بانک قوامین';
      case 'tourism': return 'بانک گردشگری';
      case 'kar': return 'بانک کارآفرین';
      case 'iz': return 'بانک ایران زمین';
      case 'hi': return 'بانک حکمت ایرانیان';
      case 'day': return 'بانک دی';
      case 'ivbb': return 'بانک صنعت و معدن';
      case 'me': return 'بانک توسعه صادرات';
      case 'edbi': return 'بانک خاورمیانه';
      case 'bim': return 'بانک ایران و ونزولا';
    }
  }

  onEdit(bankCard: BankCard) {
    this.banCardSercise.populateForm(bankCard);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    const dialogRef = this.dialog.open(EditBankCardComponent, dialogConfig);

    const sub = dialogRef.componentInstance.updateBankCard.subscribe((data) => {
      this.updateBankCard(data);
    });
    dialogRef.afterClosed().subscribe(() => {
      sub.unsubscribe();
    });

  }
  onDelete(bankCard: BankCard) {
    if (confirm('آیا از حذف این کارت مطمن هستید ؟')) {
      this.banCardSercise.deleteBankCard(bankCard.id, this.authService.decodedToken.nameid).subscribe(() => {
        this.alertService.success('کارت بانکی شما با موفقیت حذف شد', 'موفق');
        this.deleteBankCard.emit(bankCard);
      }, error => {
        this.alertService.error(error, 'خطا در حذف کارت جدید');
      });
    }

}
updateBankCard(bankCard: BankCard) {
  this.bankcard = bankCard;
}

}
