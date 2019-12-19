import { Component, OnInit, DefaultIterableDiffer } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { BankCard } from 'src/app/data/models/bankcard';
import { BankCardsService } from 'src/app/core/_services/panel/user/bankCards.service';
import { AuthService } from 'src/app/core/_services/auth/auth.service';
import { EditBankCardComponent } from './pages/edit-bank-card/edit-bank-card.component';
@Component({
  selector: 'app-manage-bank-card',
  templateUrl: './manage-bank-card.component.html',
  styleUrls: ['./manage-bank-card.component.css']
})
export class ManageBankCardComponent implements OnInit {
  formTitle: string;
  bankCards: BankCard[];
  constructor(private dialog: MatDialog, private route: ActivatedRoute, private alertService: ToastrService,
    private bankcardService: BankCardsService,
    private authService: AuthService) { }

  ngOnInit() {
    this.loadBankCards();
  }
  loadBankCards() {
    this.route.data.subscribe(data => {
      this.bankCards = data.bankcards;
    });
  }
  onCreate() {
    if (this.bankCards === null || this.bankCards === undefined) {
      this.alertService.error(' برای دسترسی به این بخش باید مدارک شما ارسال و تایید شده باشد '
        + ' برای بررسی مدارک به '
        + ' صفحه ارسال '
        + ' مراجعه کنید !!! ', 'توجه');
    } else {
      this.formTitle = 'افزودن کارت بانکی جدید';
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      const dialogRef = this.dialog.open(EditBankCardComponent, dialogConfig);
      const sub = dialogRef.componentInstance.newBankCard.subscribe((data) => {
        this.insertBankCard(data);
      });
      dialogRef.afterClosed().subscribe(() => {
        sub.unsubscribe();
      });
    }

  }
  insertBankCard(bankCard: BankCard) {
    this.bankCards.push({
      id: bankCard.id,
      approve: bankCard.approve,
      bankName: bankCard.bankName,
      hesabNumber: bankCard.hesabNumber,
      ownerName: bankCard.ownerName,
      shaba: bankCard.shaba,
      cardNumber: bankCard.cardNumber,
      expireDateMonth: bankCard.expireDateMonth,
      expireDateYear: bankCard.expireDateYear
    });
  }
  removeBankCard(bankCard: BankCard) {
    // this.bankCards.filter( p => p.id === bankCard.id);
    this.bankCards.splice(this.bankCards.indexOf(bankCard), 1);
  }

}
