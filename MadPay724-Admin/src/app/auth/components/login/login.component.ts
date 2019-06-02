import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model: any = {};

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }


  login() {
    this.authService.login(this.model).subscribe(next => {
      this.router.navigate(['/panel']);
    }, error => {
      console.log('failed');
    });
  }
}
