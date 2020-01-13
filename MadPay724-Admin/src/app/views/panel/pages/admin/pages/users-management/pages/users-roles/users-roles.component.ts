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
  constructor(private usersService: UsersService,
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

}
