import { Customer } from './customer';
import { ServiceStat } from './serviceStat';
import { FeedBack } from './feedBack';
import { Blog } from '../blog/blog';

export interface HomeData {

    customers: Customer[];
    serviceStat: ServiceStat
    feedBacks: FeedBack[];
    lastBlogs: Blog[];

}
