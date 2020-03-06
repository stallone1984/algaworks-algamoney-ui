import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../seguranca/auth.service';
import { ErrorHandlerService } from '../error-handler.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    private auth: AuthService,
    private errorHandler: ErrorHandlerService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  logout() {
    this.auth.limparAccessToken()
    .then(() => {
      this.router.navigate(['/login']);
    })
    . catch(error => {
      this.errorHandler.handle(error);
    });
  }
}
