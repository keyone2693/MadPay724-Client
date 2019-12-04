import { Directive, Input, ViewContainerRef, TemplateRef, OnInit } from '@angular/core';
import { AuthService } from '../../_services/auth/auth.service';
import * as fromStore from '../../../store';
import { Store } from '@ngrx/store';

@Directive({
  selector: '[appHasRole]'
})
export class HasRoleDirective implements OnInit {
  @Input() appHasRole: string[];
  isVisible = false;
  userRoles: Array<string>;
  constructor(private viewContainerRef: ViewContainerRef, private templateRef: TemplateRef<any>,
    private authService: AuthService, private store: Store<fromStore.State>) {
    this.store.select(fromStore.getUserRoles).subscribe(data => {
      this.userRoles = data;
    });
     }
  ngOnInit() {
    const userRoles = this.userRoles;

    if (!userRoles) {
      this.viewContainerRef.clear();
    }

    if (this.authService.roleMatch(this.appHasRole)) {
      if (!this.isVisible) {
        this.isVisible = true;
        this.viewContainerRef.createEmbeddedView(this.templateRef);
      } else {
        this.isVisible = false;
        this.viewContainerRef.clear();
      }
    }
  }
}
