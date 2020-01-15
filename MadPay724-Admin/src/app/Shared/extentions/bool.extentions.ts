import { Banks } from 'src/app/data/enums/banks.enum';
import { FactorTypes } from 'src/app/data/enums/factorTypes.enum';

declare global {
    interface Boolean {
        toTicketStatus(): string;
    }
}


Boolean.prototype.toTicketStatus = function (this: boolean): string {
    var ticketStatus = this;
    switch (ticketStatus) {
        case true:
            return 'پاسخ پشتیبان';
        case false:
            return 'پاسخ مشتری';
        default:
            return ''
    }
}
