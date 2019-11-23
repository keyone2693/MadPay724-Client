import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Blog } from 'src/app/data/models/blog/blog';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  baseUrl = environment.apiUrl + environment.apiV1 + 'site/panel/';

  constructor(private http: HttpClient) { }

  getBlogs(id: string): Observable<Blog[]> {
    return this.http.get<Blog[]>(this.baseUrl + 'users/' + id + '/blogs');
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
