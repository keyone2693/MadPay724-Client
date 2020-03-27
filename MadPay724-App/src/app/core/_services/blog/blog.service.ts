import { Injectable, OnDestroy } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Blog } from 'src/app/data/models/blog/blog';
import { PaginationResult } from 'src/app/data/models/common/paginationResult';
import { map } from 'rxjs/operators';
import { BlogDirectory } from 'src/app/data/models/blog/blogDirectory';
import { ApiReturn } from 'src/app/data/models/common/apiReturn';
import { BlogDirectoryData } from 'src/app/data/models/blog/blogDirectoryData';
import {  BlogPost } from 'src/app/data/models/blog/blogPost';


@Injectable({
  providedIn: 'root'
})
export class BlogService {
  baseUrl = environment.apiUrl + environment.apiV1 + 'site/';

  constructor(private http: HttpClient) {

  }

  getBlogs(page?, itemPerPage?, filter?, sortHe?, sortDir?): Observable<BlogDirectoryData> {
    const paginatedResult: BlogDirectoryData = {
      blogs: new PaginationResult<Blog[]>(),
      blogGroups: [],
      mostCommented: [],
      mostViewed: [],
      lastComments: null
    };
    let params = new HttpParams();
    if (page != null && itemPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemPerPage);
      params = params.append('filter', filter);
      params = params.append('sortHe', sortHe);
      params = params.append('sortDir', sortDir);
    }
    return this.http.get<ApiReturn<BlogDirectory>>(this.baseUrl + 'blogs', { observe: 'response', params })
      .pipe(
        map(response => {

          paginatedResult.blogs.result = response.body.result.blogs;
           if (response.headers.get('Pagination') != null) {
             paginatedResult.blogs.pagination = JSON.parse(response.headers.get('Pagination'));
           }
          
          paginatedResult.mostViewed = response.body.result.mostViewed;
          paginatedResult.mostCommented = response.body.result.mostCommented;
          paginatedResult.lastComments = response.body.result.lastComments;
          paginatedResult.blogGroups = response.body.result.blogGroups;
          return paginatedResult;
        })
      );
  }
  getBlog(blogId: string): Observable<ApiReturn<BlogPost>> {
    return this.http.get<ApiReturn<BlogPost>>(this.baseUrl + 'blogs/' + blogId );
  }
}
