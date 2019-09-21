export interface EasyPay {
    id: string;
    walletGateId: string ;
    isWallet: boolean;
    name: string;
    price: string;
    text: string;
    isCoupon: boolean;
    isUserEmail: boolean;
    isUserName: boolean;
    isUserPhone: boolean;
    isUserText: boolean;
    isUserEmailRequired: boolean;
    isUserNameRequired: boolean;
    isUserPhoneRequired: boolean;
    isUserTextRequired: boolean;
    userEmailExplain: string;
    userNameExplain: string;
    userPhoneExplain: string;
    userTextExplain: string;
    isCountLimit: boolean;
    countLimit: number;
    returnSuccess: string;
    returnFail: string;
}
