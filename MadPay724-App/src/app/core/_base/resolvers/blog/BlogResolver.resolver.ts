import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Blog } from 'src/app/data/models/blog/blog';
import { BlogService } from 'src/app/core/_services/blog/blog.service';
import { BlogDirectoryData } from 'src/app/data/models/blog/blogDirectoryData';


@Injectable()
export class BlogResolver implements Resolve<BlogDirectoryData> {
    pageNumber = 0;
    pageSize = 5;
    filter = '';
    sortHe = '';
    sortDir = '';
    constructor(private blogService: BlogService, private router: Router,
        private alertService: ToastrService) { }
    resolve(route: ActivatedRouteSnapshot): Observable<BlogDirectoryData> {
        if (route.url[0].path === 'page') {
            const pageNumber = (+route.params['pageNumber']) -1;
            return this.blogService.getBlogs(pageNumber, this.pageSize, this.filter, this.sortHe, this.sortDir).pipe(
                catchError(error => {
                    this.alertService.error(error, 'خطا');
                    this.router.navigate(['']);
                    return of(null);
                })
            );
        } else if (route.url[0].path === 'search') {
            const filter = route.params['filter'];
            const pageNumber = (+route.params['pageNumber']) - 1;
            return this.blogService.getBlogs(pageNumber, this.pageSize, filter, this.sortHe, this.sortDir).pipe(
                catchError(error => {
                    this.alertService.error(error, 'خطا');
                    this.router.navigate(['']);
                    return of(null);
                })
            );
        } else if (route.url[0].path === 'group') {
            const filter = route.params['name'];
            const pageNumber = (+route.params['pageNumber']) - 1;
            return this.blogService.getBlogs(pageNumber, this.pageSize, filter, this.sortHe, this.sortDir).pipe(
                catchError(error => {
                    this.alertService.error(error, 'خطا');
                    this.router.navigate(['']);
                    return of(null);
                })
            );
        }
        return of(null);
        
    }
}
