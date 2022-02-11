import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Movie } from 'src/app/models/movie.model';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnDestroy {

  constructor(private movieService: MovieService,
    private router: Router) { }

  movies: Movie[] = [];
  imgurl: string = 'https://image.tmdb.org/t/p/w500/';

  private subscription: Subscription | undefined;

  ngOnInit(): void {
    this.movieService.getList().subscribe( res => this.movies = res.results);
  }

  ngOnDestroy(): void {
      this.subscription?.unsubscribe();
  }

  navigateToDetails(id: number){
    this.router.navigate(['pelicula', id]);
  }

}
