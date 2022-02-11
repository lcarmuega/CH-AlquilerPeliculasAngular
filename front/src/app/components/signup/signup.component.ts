import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit, OnDestroy {

  error!: string;

  signupForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(2)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(5)]),
    passwordConfirmation: new FormControl('', [Validators.required])
  }); /* Agregar custom validator de que las passwords sean iguales */

  nameControl = this.signupForm.controls['name'];
  emailControl = this.signupForm.controls['email'];
  passwordControl = this.signupForm.controls['password'];
  passwordConfirmationControl = this.signupForm.controls['passwordConfirmation'];

  constructor(
    private router: Router,
    private userService: UserService
  ) { }

  private subscription: Subscription | undefined;

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
      this.subscription?.unsubscribe();
  }

  trySignup(){
    let nombre = this.signupForm.get('name')?.value;
    let email = this.signupForm.get('email')?.value;
    let password = this.signupForm.get('password')?.value;

    if(this.signupForm.valid) {
      this.userService.addUser(nombre, email, password)
        .subscribe(valid => {
          if(valid) {
            this.router.navigate(['login']);
          } else {
            this.error = 'No se pudo crear la cuenta, intente nuevamente más tarde';
          }
        })
    }
  }

}
