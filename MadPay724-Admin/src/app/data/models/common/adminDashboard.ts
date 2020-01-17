import { Days } from './days';
import { UserBlogInfo } from './userBlogInfo';
import { Blog } from '../blog/blog';
import { Ticket } from '../ticket';
import { Factor } from '../accountant/factor';
import { Entry } from '../accountant/entry';

export interface AdminDashboard {
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
    unClosedTicketCount: number;
    closedTicketCount: number;
    totalInventory: number;
    totalInterMoney: number;
    totalExitMoney: number;
    totalBlogCount: number;
    approvedBlogCount: number;
    unApprovedBlogCount: number;

    entry5Days: Days;
    factor5Days: Days;

    factor12Months: Days;
    entry12Months: Days;
    user12Months: Days;

    bankCard12Months: Days;
    gate12Months: Days;
    wallet12Months: Days;
    exitMoney5Days: Days;
    interMoney5Days: Days;
    inventory5Days: Days;

    totalBlog5Days: Days;
    unApprovedBlog5Days: Days;
    approvedBlog5Days: Days;

    last7Blogs: Blog[];
    last12UserBlogInfo: UserBlogInfo[];
   last5Tickets: Ticket[];
    last7Factors: Factor[];
    last7Entries: Entry[];
}
