import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Blog } from 'src/app/data/models/blog/blog';
import { BlogService } from 'src/app/core/_services/panel/blog/blog.service';


@Injectable()
export class BlogResolver implements Resolve<Blog[]> {
    pageNumber = 0;
    pageSize = 5;
    filter = '';
    sortHe = '';
    sortDir = '';
    constructor(private blogService: BlogService, private router: Router,
                private alertService: ToastrService) { }
    resolve(route: ActivatedRouteSnapshot): Observable<Blog[]> {
        return this.blogService.getBlogs(this.pageNumber, this.pageSize, this.filter, this.sortHe, this.sortDir).pipe(
            catchError(error => {
                this.alertService.error(error, 'خطا');
                this.router.navigate(['/panel/blog/blog']);
                return of(null);
            })
        );
    }
}
