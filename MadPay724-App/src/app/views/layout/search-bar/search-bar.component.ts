import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import 'src/app/shared/extentions/string.extentions';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {
  filter: string = '';
  constructor(private router:Router) { }

  ngOnInit() {
  }
  goSearch() {
    this.router.navigate(['/blog/search', this.filter.toSeoString(), 'page', 1]);
    this.filter = '';
  }
}
