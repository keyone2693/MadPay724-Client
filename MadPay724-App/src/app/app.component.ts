import { Component, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
constructor(private http: HttpClient) {}
  ngAfterViewInit(): void {
    import('../assets/wp-content/themes/munza/assets/js/vendor/slidingbar.js');
  }
}
