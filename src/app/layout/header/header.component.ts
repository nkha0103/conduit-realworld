import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/provider/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  currentUser;

  constructor(
    private authenticationService: AuthenticationService,
  ) {
    this.authenticationService.isAuthen.subscribe(() => {
      this.getCurrentUserName();
    });
  }

  ngOnInit() {
  }

  getCurrentUserName() {
    this.currentUser = localStorage.getItem('currentUser');
  }

}
