import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { LoginService } from 'src/app/services/login.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private url = 'http://localhost:3000/api/user';

  constructor(
    private httpClient: HttpClient,
    private loginService: LoginService
  ) { }

  getUsers(): Observable<User[]> {
    let headers = new HttpHeaders();
    let token = this.loginService.getToken();
    headers = headers.set('Authorization', token);

    return this.httpClient.get<User[]>(`${this.url}s`, { headers: headers });
  }

  getUser(id: string): Observable<User> {
    let headers = new HttpHeaders();
    let token = this.loginService.getToken();
    headers = headers.set('Authorization', token);

    return this.httpClient.get<any>(`${this.url}?id=${id}`, { headers: headers })
    .pipe(
      map( response => {
        if(response.status === 200){
          const user: User = { nombre: response.user.nombre, email: response.user.email, password: response.user.password, id: response.user.id, rol: response.user.rol };
          return user;
        }
        else{
          const user: User = { nombre: '', email: '', password: '', id: '', rol: '' };
          return user;
        }
      })
    );
  }

  updateUser(id: string, nombre: string, email: string, password: string, rol: string): Observable<boolean>{
    let headers = new HttpHeaders();
    let token = this.loginService.getToken();
    headers = headers.set('Authorization', token);

    return this.httpClient.put<any>(`${this.url}?id=${id}`, { nombre, email, password, rol }, { headers: headers })
      .pipe(
        map( response => {
          console.log(response)
          if(response.status === 200){
            return true;
          } else {
            return false;
          }
        })
      );
  }

  deleteUser(id: string): Observable<boolean> {
    let headers = new HttpHeaders();
    let token = this.loginService.getToken();
    headers = headers.set('Authorization', token);

    return this.httpClient.delete<any>(`${this.url}?id=${id}`, { headers: headers })
      .pipe(
        map( response => {
          if(response.status === 200){
            return true;
          } else {
            return false;
          }
        })
      );
  }
}
