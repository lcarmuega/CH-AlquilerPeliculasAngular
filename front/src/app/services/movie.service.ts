import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Movie, Movies } from '../models/movie.model';
import { moviesMock } from './movies.mock';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(
    private http: HttpClient
  ) { }

  getList(): Observable<Movies> {
    return this.http.get<Movies>(`https://api.themoviedb.org/3/movie/popular?api_key=${environment.apiKey}&language=en-US&page=1`);
    ///return of(moviesMock);
  }

  getDetail(id: string): Observable<Movie | undefined> {
    return this.http.get<Movie>(`https://api.themoviedb.org/3/movie/${id}?api_key=${environment.apiKey}&language=en-US`);
    //return of(moviesMock.find( movie => movie.id === id));
  }
}
