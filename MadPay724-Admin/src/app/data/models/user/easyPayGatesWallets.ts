import { EasyPay } from './easyPay';
import { Gate } from './gate';
import { Wallet } from '../wallet';

export interface EasyPayGatesWallets {
    easyPay: EasyPay;
    gates: Gate[];
    wallets: Wallet[];
}
