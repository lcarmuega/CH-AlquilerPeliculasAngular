import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit, OnDestroy {

  private user: any = null;
  adminStatus: boolean = false;

  error!: string;

  constructor(
    private router: Router,
    private userService: UserService
  ) { }

  form: FormGroup = new FormGroup({
    nombre: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required)
  });

  private subscription:  Subscription | undefined;

  ngOnInit(): void {
    this.user = this.userService.getUserInfo();
    this.form.get('nombre')?.setValue(this.user.nombre);
    this.form.get('email')?.setValue(this.user.email);
    if(this.user.rol == 'admin'){
      this.adminStatus = true;
    }
  }

  ngOnDestroy(): void {
  }

  updateUser(){
    let nombre = this.form.get('nombre')?.value;
    let email = this.form.get('email')?.value
    let id = this.user.id
    let password = this.user.password;
    let rol = this.user.rol;

    if(this.form.valid) {
      this.subscription = this.userService.updateAccount(id, nombre, email, password, rol)
        .subscribe( res => {
          if(res){
            this.router.navigate(['peliculas']);
          } else {
            this.error = "Hubo un error actualizando los datos del usuario"
          }
        });
    }
  }

  navigateAdmin(){
    this.router.navigate(['usuarios']);
  }

  logout(){
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
    this.router.navigate(['login']);
  }

}
