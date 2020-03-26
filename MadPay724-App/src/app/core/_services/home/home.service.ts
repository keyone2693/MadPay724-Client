import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { Observable } from 'rxjs';
import { HomeData } from 'src/app/data/models/home/homeData';
import { ApiReturn } from 'src/app/data/models/common/apiReturn';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  baseUrl = environment.apiUrl + environment.apiV1 + 'site/';

  constructor(private http: HttpClient) { }

  getHomeData(): Observable<ApiReturn<HomeData>> {
    return this.http.get<ApiReturn<HomeData>>(this.baseUrl + 'home/data');
  }
}
