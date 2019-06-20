import { Photo } from './photo';
import { BankCard } from './bankcard';

export interface User {
     id: string;
     name: string;
     userName: string;
     phoneNumber: string;
     address: string;
     gender: boolean;
     age: number;
     lastActive: Date;
     city: string;
     photoUrl: string;
     photo?: Photo[];
     bankCard?: BankCard[];
}