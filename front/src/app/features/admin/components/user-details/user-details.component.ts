import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { AdminService } from '../../services/admin.service';
import { adminModifyUser } from '../../store/admin.actions';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit, OnDestroy {
  error!: string;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private adminService: AdminService,
    private store: Store
  ) { }

  private subscription: Subscription | undefined;
  id: string = this.activatedRoute.snapshot.params['id'];
  user: User = { nombre: '', email: '', password: '', rol: '', id: '' };

  form: FormGroup = new FormGroup({
    nombre: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    rol: new FormControl('', Validators.required)
  });

  ngOnInit(): void {
    this.subscription = this.adminService.getUser(this.id).subscribe( res => {
      this.user = res;
      this.form.get('nombre')?.setValue(this.user.nombre);
      this.form.get('email')?.setValue(this.user.email);
      this.form.get('rol')?.setValue(this.user.rol);
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  updateUser() {
    let nombre = this.form.get('nombre')?.value;
    let email = this.form.get('email')?.value
    let password = this.user.password;
    let rol = this.form.get('rol')?.value;

    let user: User = { id: this.id, nombre: nombre, email: email, password: password, rol: rol };

    if(this.form.valid) {
      /* this.subscription = this.adminService.updateUser(user)
        .subscribe( res => {
          if(res){
            this.router.navigate(['usuarios']);
          } else {
            this.error = "Hubo un error actualizando los datos del usuario"
          }
        }); */
        this.store.dispatch(adminModifyUser({ user }));
        this.router.navigate(['usuarios']);
    }
  }

  deleteUser() {
    this.subscription = this.adminService.deleteUser(this.id)
      .subscribe( res => {
        if(res){
          this.router.navigate(['usuarios']);
        } else {
          this.error = "Hubo un error al eliminar el usuario"
        }
      });
  }

  goBack() {
    this.router.navigate(['usuarios']);
  }

}
