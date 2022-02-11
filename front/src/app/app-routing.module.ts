import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './components/account/account.component';
import { CartComponent } from './components/cart/cart.component';
import { InfoComponent } from './components/info/info.component';
import { ListComponent } from './components/list/list.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { UserDetailsComponent } from './features/admin/components/user-details/user-details.component';
import { UserListComponent } from './features/admin/components/user-list/user-list.component';
import { AdminRoleGuard } from './guards/admin-role.guard';
import { LoggedInGuard } from './guards/logged-in.guard';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'peliculas',
    component: ListComponent
  },
  {
    path: 'pelicula/:id',
    component: InfoComponent
  },
  {
    path: 'carrito',
    canActivate: [LoggedInGuard],
    component: CartComponent
  },
  {
    path: 'cuenta',
    canActivate: [LoggedInGuard],
    component: AccountComponent
  },
  {
    path: 'usuarios',
    canActivate: [LoggedInGuard, AdminRoleGuard],
    loadChildren: () => import('./features/admin/admin.module').then( a => a.AdminModule )
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
