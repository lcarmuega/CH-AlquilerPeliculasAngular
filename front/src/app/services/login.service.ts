import { HttpClient, HttpHeaders } from '@angular/common/http';
import jwt_decode from 'jwt-decode';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  url = "http://localhost:3000/api/login";

  constructor(
    private httpClient: HttpClient
  ) { }

  validateLogin(user: string, password: string): Observable<boolean>{
    return this.httpClient.post<any>(this.url, { user, password })
      .pipe(
        map(response => {
          if(response.status === 200){
            sessionStorage.setItem('token', response.token);
            const decodedToken: any = jwt_decode(response.token);
            sessionStorage.setItem('user', JSON.stringify(response.user));
            return true;
          } else {
            return false;
          }
        })
      )  }

  getToken(): string {
    let token = sessionStorage.getItem('token');
    if(token !== null){
      return token;
    } else {
      return 'error';
    }
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem('user');
    return user !== null;
  }
}
