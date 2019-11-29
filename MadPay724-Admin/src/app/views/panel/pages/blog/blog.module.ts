import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogComponent } from './blog.component';
import { BlogRoutingModule } from './blog-routing.module';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { ChartistModule } from 'ng-chartist';
import { DigitOnlyModule } from '@uiowa/digit-only';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FileUploadModule } from 'ng2-file-upload';
import { BlogMaterialModule } from 'src/app/Shared/Modules/material/blog-material.module';
import { PersianDateModule } from 'src/app/core/_base/pipe/PersianDatePipe/persian-date.module';
import { BlogDashboardComponent } from './pages/blog-dashboard/blog-dashboard.component';
import { BlogGroupManageComponent } from './pages/blog-group-manage/blog-group-manage.component';
import { BlogGroupListComponent } from './pages/blog-group-manage/pages/blog-group-list/blog-group-list.component';
import { BlogGroupAddComponent } from './pages/blog-group-manage/pages/blog-group-add/blog-group-add.component';
import { BlogGroupEditComponent } from './pages/blog-group-manage/pages/blog-group-edit/blog-group-edit.component';
import { BlogManageComponent } from './pages/blog-manage/blog-manage.component';
import { BlogAddComponent } from './pages/blog-manage/pages/blog-add/blog-add.component';
import { BlogListComponent } from './pages/blog-manage/pages/blog-list/blog-list.component';
import { BlogEditComponent } from './pages/blog-manage/pages/blog-edit/blog-edit.component';
import { BlogGroupService } from 'src/app/core/_services/panel/blog/blogGroup.service';
import { BlogGroupResolver } from 'src/app/core/_base/resolvers/blog/blogGroup.resolver';
import { BlogGroupEditResolver } from 'src/app/core/_base/resolvers/blog/blogGroupEdit.resolver';
import { HasRoleModule } from 'src/app/Shared/Modules/hasRole/hasRole.module';
import { BlogResolver } from 'src/app/core/_base/resolvers/blog/blog.resolver';
import { SharedTagInputModule } from 'src/app/shared/modules/textEditor/sharedTagInput.module';
import { SharedEJTextEditorModule } from 'src/app/shared/modules/textEditor/sharedEJTextEditor.module';
import { StoreModule } from '@ngrx/store';


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
    ChartistModule,
    HasRoleModule,
    SharedTagInputModule,
    SharedEJTextEditorModule,
    //StoreModule.forFeature(),
    //EffectsModule.forFeature(effects),
  ],
  declarations: [
    BlogComponent,
    BlogDashboardComponent,
    BlogGroupManageComponent,
    BlogGroupListComponent,
    BlogGroupAddComponent,
    BlogGroupEditComponent,
    //
    BlogManageComponent,
    BlogListComponent,
    BlogAddComponent,
    BlogEditComponent,
  ],
  providers: [
    BlogGroupService,
    //
    BlogGroupResolver,
    BlogGroupEditResolver,
    BlogResolver
    // { provide: DateAdapter, useClass: MaterialPersianDateAdapter, deps: [MAT_DATE_LOCALE] },
    // { provide: MAT_DATE_FORMATS, useValue: PERSIAN_DATE_FORMATS }
  ],
  entryComponents:
    []
})
export class BlogModule { }
