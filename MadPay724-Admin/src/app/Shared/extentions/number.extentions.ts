import { Banks } from 'src/app/data/enums/banks.enum';
import { FactorTypes } from 'src/app/data/enums/factorTypes.enum';

declare global {
    interface Number {
        toBankName(): string;
        toFactorType(): string;
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
        default:
            return ''
    }
}