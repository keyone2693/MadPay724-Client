import { Gate } from '../user/gate';
import { Wallet } from '../wallet';
import { Factor } from './factor';

export interface FactorDetail {
    factor: Factor,
    gate: Gate,
    wallet: Wallet,

}
