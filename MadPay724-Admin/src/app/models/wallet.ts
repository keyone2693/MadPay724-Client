export interface Wallet {
    id: string;
    code: string;
    isMain: boolean;
    isSms: boolean;
    isBlock: boolean;
    name: string;
    inventory: number;
    interMoney: number;
    exitMoney: number;
    onExitMoney: number;
}
