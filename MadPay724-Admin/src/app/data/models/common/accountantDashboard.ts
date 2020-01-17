import { Days } from './days';
import { Factor } from '../accountant/factor';
import { Entry } from '../accountant/entry';

export interface AccountantDashboard {
    totalSuccessEntry: number;
    totalSuccessEntryPrice: number;

    totalEntryApprove: number;
    totalEntryUnApprove: number;

    totalEntryPardakht: number;
    totalEntryUnPardakht: number;

    totalEntryReject: number;
    totalEntryUnReject: number;

    totalFactor: number;
    totalFactorPrice: number;
    totalEasyPay: number;
    totalEasyPayPrice: number;
    totalSupport: number;
    totalSupportPrice: number;
    totalIncInventory: number;
    totalIncInventoryPrice: number;
    totalSuccessFactor: number;
    totalSuccessFactorPrice: number;


    entry5Days: Days;
    factor5Days: Days;

    factor12Months: Days;
    entry12Months: Days;
    user12Months: Days;

    bankCard12Months: Days;
    gate12Months: Days;
    wallet12Months: Days;

    last7Factors: Factor[];
    last7Entries: Entry[];
}
