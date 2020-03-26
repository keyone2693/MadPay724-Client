import { Blog } from './blog';
import { BlogGroup } from './blogGroup';
import { PaginationResult } from '../common/paginationResult';

export class BlogDirectory{
    blogs: Blog[];
    mostViewed: Blog[];
    mostCommented: Blog[];
    blogGroups: BlogGroup[];
    lastComments: string;
}