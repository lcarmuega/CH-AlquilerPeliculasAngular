import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  error !: string;

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  emailControl = this.loginForm.controls['email'];
  passwordControl = this.loginForm.controls['password'];

  constructor(
    private router: Router,
    private loginService: LoginService,
  ) { }

  private subscription: Subscription | undefined;

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
      this.subscription?.unsubscribe();
  }

  tryLogin(){
    if(this.loginForm.valid) {
      let user = this.loginForm.get('email')?.value;
      let password = this.loginForm.get('password')?.value;
      this.subscription = this.loginService.validateLogin(user, password)
        .subscribe(valid => {
          if(valid){
            this.router.navigate(['peliculas']);
          } else {
            this.error = "Usuario o contraseña incorrectos"
            alert(this.error) /* Cambiar por modal */
          }
        })
    }
  }


}
