import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  navigateHome() {
    this.router.navigate(['peliculas']);
  }

  navigateAccount() {
    this.router.navigate(['cuenta']);
  }

  navigateCart() {
    this.router.navigate(['carrito']);
  }

}
