import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { BlogGroup } from 'src/app/data/models/blog/blogGroup';
import { BlogGroupService } from 'src/app/core/_services/panel/blog/blogGroup.service';

@Injectable()
export class BlogGroupResolver implements Resolve<BlogGroup[]> {
    constructor(private blogGroupService: BlogGroupService, private router: Router,
                private alertService: ToastrService) { }
    resolve(route: ActivatedRouteSnapshot): Observable<BlogGroup[]> {
        return this.blogGroupService.getBlogGroups().pipe(
            catchError(error => {
                this.alertService.error(error, 'خطا');
                this.router.navigate(['/panel/blog/bloggroup']);
                return of(null);
            })
        );
    }
}
