import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Blog } from 'src/app/data/models/blog/blog';
import { PaginationResult } from 'src/app/data/models/common/paginationResult';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  baseUrl = environment.apiUrl + environment.apiV1 + 'site/panel/';

  constructor(private http: HttpClient) { }

  

  getBlogs(id: string, page?, itemPerPage?, filter?, sortHe?, sortDir?): Observable<PaginationResult<Blog[]>> {
    const paginatedResult: PaginationResult<Blog[]> = new PaginationResult<Blog[]>();
    let params = new HttpParams();

    if (page != null && itemPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemPerPage);
      params = params.append('filter', filter);
      params = params.append('sortHe', sortHe);
      params = params.append('sortDir', sortDir);
    }
    return this.http.get<Blog[]>(this.baseUrl + 'users/' + id + '/blogs', { observe: 'response', params })
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
  getBlog(id: string, blogId: string): Observable<Blog> {
    return this.http.get<Blog>(this.baseUrl + 'users/' + id + '/blogs/' + blogId);
  }
  addBlog(blog: any, id: string): Observable<Blog> {
    return this.http.post<Blog>(this.baseUrl + 'users/' + id + '/blogs', blog);
  }

  updateBlog(blog: any, userId: string, id: string) {
    return this.http.put(this.baseUrl + 'users/' + userId + '/blogs/' + id, blog);
  }

  deleteBlog(userId: string, blogId: string) {
    return this.http.delete(this.baseUrl + 'users/' + userId + '/blogs/' + blogId);
  }
  deleteImgBlog(userId: string, imgUrl: string) {
    return this.http.post(this.baseUrl + 'users/' + userId + '/blogs/deleteupload', { imgUrl });
  }
}
