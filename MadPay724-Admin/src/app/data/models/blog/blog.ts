import { User } from '../user';
import { BlogGroup } from './blogGroup';

export interface Blog {
    id: string;
    dateModified: string;
    title: string;
    tags: string;
    picAddress: string;
    text: string;
    status: boolean;
    summerText: string;
    isSelected: boolean;
    viewCount: number;

    userId: string;
    userName: string;
    name: string;

    blogGroupId: string;
    blogGroupName: string;
}
