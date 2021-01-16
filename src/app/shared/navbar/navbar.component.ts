import {Component, OnInit} from '@angular/core';
import {LoginService} from '../../core/services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  localStorage = localStorage;

  constructor(
    public loginService: LoginService
  ) {
  }

  ngOnInit(): void {
  }

}
