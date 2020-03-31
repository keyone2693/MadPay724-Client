import { Directive, Input, ViewContainerRef, TemplateRef, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../_services/auth/auth.service';
import * as fromStore from '../../../store';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[appHasRoleNotShow]'
})
  
export class HasRoleNotShow implements OnInit, OnDestroy {
  @Input() appHasRoleNotShow: string[];
  isVisible = true;
  userRoles: Array<string>;
  subManager = new Subscription();
  constructor(private viewContainerRef: ViewContainerRef, private templateRef: TemplateRef<any>,
    private authService: AuthService, private store: Store<fromStore.State>) {
    this.subManager.add(
      this.store.select(fromStore.getUserRoles).subscribe(data => {
        this.userRoles = data;
      })
    );

  }
  ngOnInit() {
    const userRoles = this.userRoles;
    if (!userRoles) {
      this.viewContainerRef.clear();
    }
    if (this.authService.roleMatch(this.appHasRoleNotShow)) {
      if (this.isVisible) {
        this.isVisible = false;
        this.viewContainerRef.clear();

      } else {
        this.isVisible = true;
        this.viewContainerRef.createEmbeddedView(this.templateRef);

      }
    }
  }
  ngOnDestroy() {
    this.subManager.unsubscribe();
  }
}
