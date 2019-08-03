import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { BankCardComponent } from './bank-card/bank-card.component';
@Component({
  selector: 'app-manage-bank-card',
  templateUrl: './manage-bank-card.component.html',
  styleUrls: ['./manage-bank-card.component.css']
})
export class ManageBankCardComponent implements OnInit {
  formTitle: string;
  constructor(private dialog: MatDialog) { }

  ngOnInit() {
  }

  onCreate() {
    this.formTitle = 'افزودن کارت بانکی جدید';
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '35%';
    this.dialog.open(BankCardComponent, dialogConfig);
  }

}
