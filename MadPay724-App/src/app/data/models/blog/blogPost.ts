import { Blog } from './blog';
import { BlogGroup } from './blogGroup';

export class BlogPost{
    blog: Blog;
    leftBlog: Blog;
    rightBlog: Blog;
    relatedBlogs: Blog[];
    mostViewed: Blog[];
    mostCommented: Blog[];
    blogGroups: BlogGroup[];
    lastComments: string;
}