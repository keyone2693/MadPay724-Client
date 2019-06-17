import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/components/auth/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private router: Router, private alertService: ToastrService, public authService: AuthService) {
  }

  ngOnInit() {
  }
  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/auth/login']);
    this.alertService.warning('با موفقیت خارج شدید', 'موفق');
  }
}
