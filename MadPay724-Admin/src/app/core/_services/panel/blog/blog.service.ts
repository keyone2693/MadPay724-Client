import { Injectable, OnDestroy } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Blog } from 'src/app/data/models/blog/blog';
import { PaginationResult } from 'src/app/data/models/common/paginationResult';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import * as fromStore from '../../../../store';

@Injectable({
  providedIn: 'root'
})
export class BlogService  {
  baseUrl = environment.apiUrl + environment.apiV1 + 'site/panel/';
  userId: string;
  constructor(private http: HttpClient, private store: Store<fromStore.State>) { 
    this.store.select(fromStore.getUserId).subscribe(data => {
      this.userId = data;
    });
  }
  getBlogs(page?, itemPerPage?, filter?, sortHe?, sortDir?,userId: string = this.userId): Observable<PaginationResult<Blog[]>> {
    const paginatedResult: PaginationResult<Blog[]> = new PaginationResult<Blog[]>();
    let params = new HttpParams();

    if (page != null && itemPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemPerPage);
      params = params.append('filter', filter);
      params = params.append('sortHe', sortHe);
      params = params.append('sortDir', sortDir);
    }
    return this.http.get<Blog[]>(this.baseUrl + 'users/' + userId + '/blogs', { observe: 'response', params })
      .pipe(
        map(response => {
          paginatedResult.result = response.body;
          if (response.headers.get('Pagination') != null) {
            paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
          }
          return paginatedResult;
        })
      );
  }
  testgetBlogs(page?, itemPerPage?, filter?, sortHe?, sortDir?,userId: string = this.userId): Observable<Blog[]> {
    let params = new HttpParams();

    if (page != null && itemPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemPerPage);
      params = params.append('filter', filter);
      params = params.append('sortHe', sortHe);
      params = params.append('sortDir', sortDir);
    }
    return this.http.get<Blog[]>(this.baseUrl + 'users/' + userId + '/blogs', { observe: 'response', params })
      .pipe(
        map(response => {
          return response.body;
        })
      );
  }
  getBlog(blogId: string, userId: string = this.userId): Observable<Blog> {
    return this.http.get<Blog>(this.baseUrl + 'users/' + userId + '/blogs/' + blogId);
  }
  addBlog(blog: any, userId: string = this.userId): Observable<Blog> {
    return this.http.post<Blog>(this.baseUrl + 'users/' + userId + '/blogs', blog);
  }

  updateBlog(blog: any, id: string, userId: string = this.userId) {
    return this.http.put(this.baseUrl + 'users/' + userId + '/blogs/' + id, blog);
  }
  approveBlog(flag: boolean, id: string, userId: string = this.userId) {
    return this.http.put(this.baseUrl + 'users/' + userId + '/blogs/' + id + '/approveBlog', { flag });
  }
  selectBlog(flag: any, id: string, userId: string = this.userId) {
    return this.http.put(this.baseUrl + 'users/' + userId + '/blogs/' + id + '/selectBlog', { flag });
  }
  deleteBlog(blogId: string, userId: string = this.userId) {
    return this.http.delete(this.baseUrl + 'users/' + userId + '/blogs/' + blogId);
  }
  deleteImgBlog(imgUrl: string, userId: string = this.userId) {
    return this.http.post(this.baseUrl + 'users/' + userId + '/blogs/deleteupload', { imgUrl });
  }
}
