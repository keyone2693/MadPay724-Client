import { Banks } from 'src/app/data/enums/banks.enum';
import { FactorTypes } from 'src/app/data/enums/factorTypes.enum';

declare global {
    interface Number {
        toBankName(): string;
        toFactorType(): string;
        toTicketDepartment(): string;
        toTicketLevel(): string;
        toDocStatus(): string;
        toBadgeClass(): string;
    }
}

Number.prototype.toBankName = function (this: number): string {
    var bankCode = this;
    switch(bankCode){
        case Banks.Saman:
            return 'سامان';
        case Banks.Mellat:
            return 'ملت';
        case Banks.Persian:
            return 'پارسیان';
        case Banks.Pasargad:
            return 'پاسارگاد';
        case Banks.IranKish:
            return 'ایران کیش';
        case Banks.Melli:
            return 'ملی';
        case Banks.AsanPardakht:
            return 'آسان پرداخت';
        case Banks.ZarinPal:
            return 'زرین پال';
        case Banks.Virtual:
            return 'مجازی';
        default:
            return ''
    }  
}
Number.prototype.toFactorType = function (this: number): string {
    var factorCode = this;
    switch (factorCode) {
        case FactorTypes.Factor:
            return 'فاکتور';
        case FactorTypes.EasyPay:
            return 'ایزی پی';
        case FactorTypes.Support:
            return 'حمایتی';
        case FactorTypes.IncInventory:
            return 'افزایش موجودی';
        default:
            return ''
    }
}
Number.prototype.toTicketLevel = function (this: number): string {
    var ticketDepartment = this;
    switch (ticketDepartment) {
        case 1:
            return 'عادی';
        case 2:
            return 'مهم';
        case 3:
            return 'خیلی مهم';
        default:
            return ''
    }
}
Number.prototype.toTicketDepartment = function (this: number): string {
    var ticketLevel = this;
    switch (ticketLevel) {
        case 1:
            return 'پشتیبانی فنی';
        case 2:
            return ' مالی و حسابداری';
        case 3:
            return 'سوالات عمومی';
        case 4:
            return 'انتقادات و پیشنهادات';
        case 5:
            return 'نظارت بر محتوا';
        case 6:
            return 'حل اختلاف';
        default:
            return ''
    }
}
Number.prototype.toDocStatus = function (this: number): string {
    var docStatus = this;
    switch (docStatus) {
        case 0:
            return 'در حال بررسی';
        case 1:
            return 'تایید شده';
        case 2:
            return 'رد شده';
        default:
            return ''
    }
}

Number.prototype.toBadgeClass = function (this: number): string {
    var number = this;
    if (number >= 0 && number <= 3)
        return 'badge-success';
   else if (number >= 4 && number <= 6)
        return 'badge-info';
    else if (number >= 7 && number <= 10)
        return 'badge-warning';
    else if (number >= 11)
        return 'badge-danger';
    
    return 'badge-warning';
}