import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { BlogService } from 'src/app/core/_services/blog/blog.service';
import { BlogPost } from 'src/app/data/models/blog/blogPost';
import { ApiReturn } from 'src/app/data/models/common/apiReturn';


@Injectable()
export class BlogPostResolver implements Resolve<ApiReturn<BlogPost>> {
    constructor(private blogService: BlogService, private router: Router,
        private alertService: ToastrService) { }
    resolve(route: ActivatedRouteSnapshot): Observable<ApiReturn<BlogPost>> {
        const blogId = route.params['blogId'];
        return this.blogService.getBlog(blogId).pipe(
            catchError(error => {
                this.alertService.error(error, 'خطا');
                this.router.navigate(['notfound/404']);
                return of(null);
            })
        );


    }
}
