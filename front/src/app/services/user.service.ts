import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { User } from '../models/user.model';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url = "http://localhost:3000/api/user";

  constructor(
    private httpClient: HttpClient,
    private loginService: LoginService
  ) { }

  addUser(nombre: string, email: string, password: string): Observable<boolean> {
    return this.httpClient.post<any>(this.url, { nombre, email, password, rol: 'user' })
      .pipe(
        map(response => {
          if(response.status === 200) {
            return true;
          }
          else {
            return false;
          }
        })
      )
  }

  getUserInfo(): any {
    let user = sessionStorage.getItem('user');
    if(user !== null){
      user = JSON.parse(user);
    }
    return user;
  }

  updateAccount(id: string, nombre: string, email: string, password: string, rol: string): Observable<boolean> {
    let headers = new HttpHeaders();
    let token = this.loginService.getToken();
    headers = headers.set('Authorization', token);

    return this.httpClient.put<any>(`${this.url}?id=${id}`, { nombre, email, password, rol }, { headers: headers })
      .pipe(
        map( response => {
          if(response.status === 200){
            sessionStorage.setItem('user', JSON.stringify(response.user));
            return true;
          } else {
            return false;
          }
        })
      );

  }

}
