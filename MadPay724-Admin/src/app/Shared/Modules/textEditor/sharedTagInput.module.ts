import { NgModule } from '@angular/core';
import { TagInputModule } from 'ngx-chips';

@NgModule({
  imports: [TagInputModule],
  exports: [TagInputModule],
})
export class SharedTagInputModule { }
