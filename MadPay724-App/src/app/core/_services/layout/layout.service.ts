import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BlogDirectory } from 'src/app/data/models/blog/blogDirectory';
import { ApiReturn } from 'src/app/data/models/common/apiReturn';


@Injectable({
  providedIn: 'root'
})
export class LayoutService {
  baseUrl = environment.apiUrl + environment.apiV1 + 'site/';

  constructor(private http: HttpClient) {

  }

  getSidbarData(): Observable<ApiReturn<BlogDirectory>> {
    return this.http.get<ApiReturn<BlogDirectory>>(this.baseUrl + 'layout/sidebar/data');
  }

}
