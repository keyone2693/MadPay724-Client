import { NgModule, Pipe } from '@angular/core';
import { HasRoleDirective } from 'src/app/core/_base/directives/hasRole.directive';
import { HasRoleNotShow } from 'src/app/core/_base/directives/hasRoleNotShow.directive';

@NgModule({
  declarations: [HasRoleDirective, HasRoleNotShow],
  exports: [HasRoleDirective, HasRoleNotShow],
})
export class HasRoleModule { }
