import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Observable, from } from 'rxjs';
import { MatTableDataSource } from '@angular/material';
import { UsersService } from 'src/app/core/_services/panel/admin/users.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Role } from 'src/app/data/models/admin/role';

import * as fromStore from 'src/app/store';
import { Store } from '@ngrx/store';
import { CurrentTitleStateModel } from 'src/app/store/_model/currentTitleStateModel';
import { Location } from '@angular/common';

@Component({
  selector: 'app-users-roles',
  templateUrl: './users-roles.component.html',
  styleUrls: ['./users-roles.component.css']
})
export class UsersRolesComponent implements OnInit, OnDestroy {
  subManager = new Subscription();
  userRoles: MatTableDataSource<Role>;
  displayedColumns: string[] = ['role', 'status', 'text'];
  userInfo$: Observable<CurrentTitleStateModel>;
  constructor(private usersService: UsersService,private loc: Location,
    private router: Router, private route: ActivatedRoute,
    private alertService: ToastrService, private store: Store<fromStore.State>) { }

  ngOnInit() {
    this.userInfo$ = this.store.select(fromStore.getCurrentTitle);
    this.loadgetInventories();
  }
  ngOnDestroy() {
    this.subManager.unsubscribe();
  }
  loadgetInventories() {
    this.route.data.subscribe(data => {
      this.userRoles = data.roles;
    });

  }
  getRoleText(role: Role): string{
    switch (role.value) {
      case 'Admin':
        return 'دسترسی ادمین ، بلاگ ، مدیریت بلاگ ، حسابداری';
      case 'Accountant':
        return 'دسترسی حسابداری';
      case 'AdminBlog':
        return 'دسترسی مدیریت بلاگ ، بلاگ';
      case 'Blog':
        return 'دستری بلاگ';
      case 'User':
        return 'دسترسی کاربر';
      default:
        return '';
    }
  }
  onStatusChange(event: any,value:string ,userId: string) {
    this.subManager.add(
      this.usersService.changeRoleStatus(userId, value, event.checked)
        .subscribe(() => {
          if (event.checked === true) {
            this.alertService.success('نقش به کاربر اختصاص داده شد', 'موفق');
          } else {
            this.alertService.success('نقش از کاربر سلب شد', 'موفق');
          }
        }, error => {
          this.alertService.error(error);
        })
    )
  }
  onBack() {
    this.loc.back();
  }
}
