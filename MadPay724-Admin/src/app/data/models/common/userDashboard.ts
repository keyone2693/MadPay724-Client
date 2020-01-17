import { Days } from './days';
import { Ticket } from '../ticket';
import { Factor } from '../accountant/factor';
import { Entry } from '../accountant/entry';

export interface UserDashboard {
    unClosedTicketCount: number,
    closedTicketCount: number,

    last5Tickets: Ticket[],

    totalInventory: number,
    inventory5Days: Days,

    totalInterMoney: number,
    interMoney5Days: Days,

    totalExitMoney: number,
    exitMoney5Days: Days,


    factor12Months: Days,
    last7Factors: Factor[],


    totalSuccessEntry: number,
    last10Entries: Entry[],


    totalFactorDaramad: number,
    totalEasyPayDaramad: number,
    totalSupportDaramad: number,
    totalIncInventoryDaramad: number,
    totalSuccessFactor: number,
}
