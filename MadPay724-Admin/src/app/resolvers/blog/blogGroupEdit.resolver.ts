import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from 'src/app/Services/auth/auth.service';
import { BlogGroup } from 'src/app/models/blog/blogGroup';
import { BlogGroupService } from 'src/app/Services/panel/blog/blogGroup.service';

@Injectable()
export class BlogGroupEditResolver implements Resolve<BlogGroup> {
    constructor(private blogGroupService: BlogGroupService, private router: Router,
                private alertService: ToastrService, private authService: AuthService) { }
    resolve(route: ActivatedRouteSnapshot): Observable<BlogGroup> {
        return this.blogGroupService.getBlogGroup(this.authService.decodedToken.nameid, route.params['bloggroupId']).pipe(
            catchError(error => {
                this.alertService.error(error, 'خطا');
                this.router.navigate(['/panel/user/easypay']);
                return of(null);
            })
        );
    }
}
