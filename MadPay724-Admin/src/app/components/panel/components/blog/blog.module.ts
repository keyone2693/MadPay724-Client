import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogComponent } from './blog.component';
import { BlogDashboardComponent } from './components/blog-dashboard/blog-dashboard.component';
import { BlogRoutingModule } from './blog-routing.module';

@NgModule({
  imports: [
    BlogRoutingModule,
    CommonModule
  ],
  declarations: [
    BlogComponent,
    BlogDashboardComponent
  ]
})
export class BlogModule { }
