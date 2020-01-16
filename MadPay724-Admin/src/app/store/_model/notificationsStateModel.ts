export interface NotificationStateModel {
    unVerifiedBlogCount: number;
    unClosedTicketCount: number;
    unCheckedEntry: number;
    unSpecifiedEntry: number;
    unVerifiedGateInPast7Days: number;
    unVerifiedBankCardInPast7Days: number;
    unVerifiedDocuments: number;

    error?: string;
}