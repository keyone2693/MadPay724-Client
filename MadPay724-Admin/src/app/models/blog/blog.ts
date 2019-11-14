import { User } from '../user';
import { BlogGroup } from './blogGroup';

export interface Blog {
    id: string;
    title: string;
    tags: string;
    picAddress: string;
    text: string;
    status: boolean;
    summerText: string;
    isSelected: boolean;
    viewCount: number;

    userId: string;
    blogGroupId: string;
    user: User;
    blogGroup: BlogGroup;
}
