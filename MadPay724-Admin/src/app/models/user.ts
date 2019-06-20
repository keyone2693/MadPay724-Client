import { Photo } from './photo';
import { BankCard } from './bankcard';

export interface User {
     id: string;
     name: string;
     username: string;
     phonenumber: string;
     address: string;
     gender: boolean;
     age: number;
     lastactive: Date;
     city: string;
     photourl: string;
     photo?: Photo[];
     bankkard?: BankCard[];
}