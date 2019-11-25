import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Blog } from 'src/app/data/models/blog/blog';
import { BlogService } from 'src/app/core/_services/panel/blog/blog.service';
import { AuthService } from 'src/app/core/_services/auth/auth.service';
import { PaginationResult } from 'src/app/data/models/common/paginationResult';


@Injectable()
export class BlogResolver implements Resolve<Blog[]> {
    pageNumber = 0;
    pageSize = 5;
    filter = '';
    constructor(private blogService: BlogService, private router: Router,
                private alertService: ToastrService, private authService: AuthService) { }
    resolve(route: ActivatedRouteSnapshot): Observable<Blog[]> {
        return this.blogService.getBlogs(this.authService.decodedToken.nameid, this.pageNumber, this.pageSize, this.filter).pipe(
            catchError(error => {
                this.alertService.error(error, 'خطا');
                this.router.navigate(['/panel/blog/blog']);
                return of(null);
            })
        );
    }
}
