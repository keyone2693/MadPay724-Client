import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { BankCard } from 'src/app/models/bankcard';
import { BankCardService } from 'src/app/Services/panel/user/bankcard.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/Services/auth/auth.service';
import { EditBankCardComponent } from './edit-bank-card/edit-bank-card.component';
@Component({
  selector: 'app-manage-bank-card',
  templateUrl: './manage-bank-card.component.html',
  styleUrls: ['./manage-bank-card.component.css']
})
export class ManageBankCardComponent implements OnInit {
  formTitle: string;
  bankCards: BankCard[];
  constructor(private dialog: MatDialog, private route: ActivatedRoute, private alertService: ToastrService,
              private formBuilder: FormBuilder, private bankcardService: BankCardService,
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
    this.formTitle = 'افزودن کارت بانکی جدید';
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    this.dialog.open(EditBankCardComponent, dialogConfig);
  }

}
