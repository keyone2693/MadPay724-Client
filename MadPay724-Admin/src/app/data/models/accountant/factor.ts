export interface Factor {
    id: string;
    dateCreated: Date;
    dateModified: Date;
    userName: string;
    status: boolean;
    kind: number;
    bank: number;
    giftCode: string;
    isGifted: boolean;
    price: number;
    endPrice: number;
    refBank: string;
    enterMoneyWalletId: string;
    userId: string;
    gateId: string;
    redirectUrl: string;
    mobile: string;
    email: string;
    factorNumber: string;
    description: string;
    validCardNumber: string;

    isAlreadyVerified: boolean;
    gatewayName: string;
    message: string;

}
