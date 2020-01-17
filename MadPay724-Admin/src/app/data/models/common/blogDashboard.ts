import { Days } from './days';
import { Blog } from '../blog/blog';
import { UserBlogInfo } from './userBlogInfo';

export interface BlogDashboard {
    totalBlogCount: number;
    approvedBlogCount: number;
    unApprovedBlogCount: number;


    totalBlog5Days: Days;
    unApprovedBlog5Days: Days;
    approvedBlog5Days: Days;

    last7Blogs: Blog[];
    last12UserBlogInfo: UserBlogInfo[];
}
