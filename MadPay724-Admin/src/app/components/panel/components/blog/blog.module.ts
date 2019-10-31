import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogComponent } from './blog.component';
import { BlogDashboardComponent } from './components/blog-dashboard/blog-dashboard.component';
import { BlogRoutingModule } from './blog-routing.module';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { ChartistModule } from 'ng-chartist';
import { PersianDateModule } from 'src/app/Shared/Pipe/PersianDatePipe/persian-date.module';
import { DigitOnlyModule } from '@uiowa/digit-only';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FileUploadModule } from 'ng2-file-upload';
import { BlogMaterialModule } from 'src/app/Shared/Modules/material/blog-material.module';
import { BlogManageComponent } from './components/blog-manage/blog-manage.component';
import { BlogGroupListComponent } from './components/blog-group-manage/components/blog-group-list/blog-group-list.component';
import { BlogGroupService } from 'src/app/Services/panel/blog/blogGroup.service';

@NgModule({
  imports: [
    BlogRoutingModule,
    CommonModule,
    FileUploadModule,
    FormsModule,
    ReactiveFormsModule,
    BlogMaterialModule,
    DigitOnlyModule,
    PersianDateModule,
    SweetAlert2Module.forRoot(),
    ChartistModule
  ],
  declarations: [
    BlogComponent,
    BlogDashboardComponent,
    BlogManageComponent,
    BlogGroupListComponent
  ],
  providers: [
    BlogGroupService,
    // { provide: DateAdapter, useClass: MaterialPersianDateAdapter, deps: [MAT_DATE_LOCALE] },
    // { provide: MAT_DATE_FORMATS, useValue: PERSIAN_DATE_FORMATS }
  ],
  entryComponents:
    []
})
export class BlogModule { }
