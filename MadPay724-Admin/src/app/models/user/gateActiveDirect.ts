import { Wallet } from '../wallet';
import { Gate } from './gate';

export interface GateActiveDirect {
    gate: Gate;
    wallets: Wallet[];
    isDirect: boolean;
}
