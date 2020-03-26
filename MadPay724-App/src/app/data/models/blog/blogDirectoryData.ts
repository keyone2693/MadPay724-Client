import { Blog } from './blog';
import { BlogGroup } from './blogGroup';
import { PaginationResult } from '../common/paginationResult';

export class BlogDirectoryData {
    blogs: PaginationResult<Blog[]>;
    mostViewed: Blog[];
    mostCommented: Blog[];
    blogGroups: BlogGroup[];
    lastComments: string;
}