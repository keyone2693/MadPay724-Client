export interface TicketContent {
    id: string;
    ticketId: string;
    dateModified: Date;
    dateCreated: Date;
    text: string;
    fileUrl: string;
    isAdminSide: boolean;
}
