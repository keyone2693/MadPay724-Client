import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BlogGroup } from 'src/app/data/models/blog/blogGroup';
import { Store } from '@ngrx/store';

import * as fromStore from '../../../../store';

@Injectable({
  providedIn: 'root'
})
export class BlogGroupService {
  baseUrl = environment.apiUrl + environment.apiV1 + 'site/panel/';
  userId: string;
  constructor(private http: HttpClient, private store: Store<fromStore.State>) { 
    this.store.select(fromStore.getUserId).subscribe(data => {
      this.userId = data;
    }); 
  }
 
  getBlogGroups(userId: string = this.userId): Observable<BlogGroup[]> {
    return this.http.get<BlogGroup[]>(this.baseUrl + 'users/' + userId + '/blogGroups');
  }
  getBlogGroup(blogGroupId: string,userId: string = this.userId): Observable<BlogGroup> {
    return this.http.get<BlogGroup>(this.baseUrl + 'users/' + userId + '/blogGroups/' + blogGroupId);
  }
  addBlogGroup(blogGroup: any, userId: string = this.userId): Observable<BlogGroup> {
    return this.http.post<BlogGroup>(this.baseUrl + 'users/' + userId + '/blogGroups', blogGroup);
  }

  updateBlogGroup(blogGroup: any, id: string, userId: string = this.userId) {
    return this.http.put(this.baseUrl + 'users/' + userId + '/blogGroups/' + id, blogGroup);
  }

  deleteBlogGroup( blogGroupId: string, userId: string = this.userId) {
    return this.http.delete(this.baseUrl + 'users/' + userId + '/blogGroups/' + blogGroupId);
  }
}
