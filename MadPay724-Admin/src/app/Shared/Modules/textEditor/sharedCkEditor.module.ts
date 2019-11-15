import { NgModule } from '@angular/core';
import { CKEditorModule } from 'ckeditor4-angular';

@NgModule({
  imports: [CKEditorModule],
  exports: [CKEditorModule],
})
export class SharedCkEditorModule { }
