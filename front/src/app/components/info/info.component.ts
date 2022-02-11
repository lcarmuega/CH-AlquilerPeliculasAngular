import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouteReuseStrategy } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Movie } from 'src/app/models/movie.model';
import { MovieService } from 'src/app/services/movie.service';
import { cartAddMovie } from 'src/app/store/cart.actions';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss'],
})
export class InfoComponent implements OnInit, OnDestroy {
  constructor(
    private activatedRoute: ActivatedRoute,
    private movieService: MovieService,
    private router: Router,
    private store: Store
  ) {}

  movie?: Movie = undefined;
  imgurl: string = 'https://image.tmdb.org/t/p/w500/';

  private subscription: Subscription | undefined;

  ngOnInit(): void {
    this.subscription = this.movieService
      .getDetail(this.activatedRoute.snapshot.params['id'])
      .subscribe((res) => (this.movie = res));
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  addToCart(id: number | undefined) {
    console.log('added ' + id + ' to cart');
    console.log(this.movie)
    if (this.movie != undefined) {
      this.store.dispatch(cartAddMovie({ item: this.movie }));
      this.router.navigate(['carrito']);
    } else {
      alert('Ocurrió un error, intente nuevamente más tarde');
    }
  }
}
