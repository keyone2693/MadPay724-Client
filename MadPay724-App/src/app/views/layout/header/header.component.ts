import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements AfterViewInit {
  constructor() { }
  ngAfterViewInit(): void {
    import('../../../../assets/wp-content/themes/munza/assets/js/vendor/slidingbar.js');
  }
}