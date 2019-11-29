import { DataSource } from '@angular/cdk/table'
import { Blog } from 'src/app/data/models/blog/blog'
import { BehaviorSubject, Observable, of } from 'rxjs';
import { CollectionViewer } from '@angular/cdk/collections';
import * as fromBlogStore from '../../../views/panel/pages/blog/store';
import { Store, select } from '@ngrx/store';
import { catchError, tap } from 'rxjs/operators';

export class BlogDataSource implements DataSource<Blog> {
    private blogSubject = new BehaviorSubject<Blog[]>([]);

    //constructor(private store: Store<fromBlogStore.BlogState>) { }
    // loadBlogs(page: fromBlogStore.PageQuery) {
    //     this.store
    //         .pipe(
    //             select(fromBlogStore.getBlogsPage(page)),
    //             tap(blogs => {
    //                 if (blogs.length > 0) {
    //                     this.blogSubject.next(blogs);
    //                 } else {
    //                     this.store.dispatch(new fromBlogStore.LoadBlogs(page));
    //                 }
    //             }),
    //             catchError(err => of([]))
    //         ).subscribe();
    // }   
    connect(collectionViewer: CollectionViewer): Observable<Blog[]>{
        console.log("connecting data source");
        return this.blogSubject.asObservable();
    }
    disconnect(collectionViewer: CollectionViewer): void {
        this.blogSubject.complete();
    }
}