import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements AfterViewInit {
  constructor() {
    const node = document.createElement('script');
    node.type = 'text/javascript';
    node.charset = 'utf-8';
    node.src = '../../../../assets/wp-content/themes/munza/assets/js/vendor/slidingbar.js';
    node.async = true;
    document.body.appendChild(node);
  }
  ngAfterViewInit(): void {
  }
}