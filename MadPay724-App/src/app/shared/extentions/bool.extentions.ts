import { Banks } from 'src/app/data/enums/banks.enum';
import { FactorTypes } from 'src/app/data/enums/factorTypes.enum';

declare global {
    interface Boolean {
        toTicketStatus(): string;
        toStatus(): string;
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
Boolean.prototype.toStatus = function (this: boolean): string {
    var ticketStatus = this;
    switch (ticketStatus) {
        case true:
            return 'موفق';
        case false:
            return 'ناموفق';
        default:
            return ''
    }
}