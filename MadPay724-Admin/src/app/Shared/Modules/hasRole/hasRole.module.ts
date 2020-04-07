import { NgModule, Pipe } from '@angular/core';
import { HasRoleDirective } from 'src/app/core/_base/directives/hasRole.directive';
import { HasRoleNotShow } from 'src/app/core/_base/directives/hasRoleNotShow.directive';

@Pipe({
  name: 'appHasRole',
  pure: false
})
export class ExHasRoleDirective extends HasRoleDirective { };
@Pipe({
  name: 'appHasRoleNotShow',
  pure: false
})
export class ExHasRoleNotShow extends HasRoleNotShow { };
@NgModule({
  declarations: [ExHasRoleDirective, ExHasRoleNotShow],
  exports: [ExHasRoleDirective, ExHasRoleNotShow],
})
export class HasRoleModule { }
