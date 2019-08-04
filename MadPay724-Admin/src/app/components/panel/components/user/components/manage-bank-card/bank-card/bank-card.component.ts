import { Component, OnInit, Input } from '@angular/core';
import { BankCard } from 'src/app/models/bankcard';

@Component({
  selector: 'app-bank-card',
  templateUrl: './bank-card.component.html',
  styleUrls: ['./bank-card.component.css']
})
export class BankCardComponent implements OnInit {
@Input() bankcard: BankCard;
approve: boolean;
  constructor() { }

  ngOnInit() {
    this.approve = true;
  }

  getBankName(bn: string): string {
    switch (bn) {
      case'bsi' :  return 'بانک صادرات';
      case'mellat' :  return 'بانک ملت';
      case'tejarat' :  return 'بانک تجارت';
      case'bmi' :  return 'بانک ملی ایران';
      case'sepah' :  return 'بانک سپه';
      case'bki' :  return 'بانک کشاورزی';
      case'parsian' :  return 'بانک پارسیان';
      case'maskan' :  return 'بانک مسکن';
      case'rb' :  return 'بانک رفاه کارگران';
      case'en' :  return 'بانک اقتصاد نوین';
      case'post' :  return 'بانک پست بانک';
      case'sina' :  return 'بانک سینا';
      case'bpi' :  return 'بانک سامان';
      case'bpi' :  return 'بانک پاسارگاد';
      case'ansar' :  return 'بانک انصار';
      case'sarmayeh' :  return 'بانک سرمایه';
      case'ba' :  return 'بانک آینده';
      case'shahr' :  return 'بانک شهر';
      case'tt' :  return 'بانک توسعه تعاون';
      case'ghbi' :  return 'بانک قوامین';
      case'tourism' :  return 'بانک گردشگری';
      case'kar' :  return 'بانک کارآفرین';
      case'iz' :  return 'بانک ایران زمین';
      case'hi' :  return 'بانک حکمت ایرانیان';
      case'day' :  return 'بانک دی';
      case'ivbb' :  return 'بانک صنعت و معدن';
      case'me' :  return 'بانک توسعه صادرات';
      case'edbi' :  return 'بانک خاورمیانه';
      case'bim' :  return 'بانک ایران و ونزولا';
    }
  }

}
