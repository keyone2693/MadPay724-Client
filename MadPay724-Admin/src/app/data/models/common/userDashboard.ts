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

    totalSuccessFactor: number,
    factor8Months:Days,
    last7Factors: Factor[],


    totalSuccessEntry: number,
    last10Entries: Entry[],
}
