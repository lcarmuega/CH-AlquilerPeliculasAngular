import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Movie } from 'src/app/models/movie.model';
import { cartClear, cartRemoveMovie } from 'src/app/store/cart.actions';
import { cartItemsSelector, cartTotalSelector } from 'src/app/store/cart.selectors';
import { CartState } from 'src/app/store/cart.state.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  cartItems$!: Observable<Movie[]>;
  cartTotal$!: Observable<number>;

  imgurl: string = 'https://image.tmdb.org/t/p/w500/';

  constructor(
    private store: Store<CartState>
  ) { }

  ngOnInit(): void {
    this.cartItems$ = this.store.pipe(
      select(cartItemsSelector)
    );
    this.cartTotal$ = this.store.pipe(
      select(cartTotalSelector)
    );
  }

  removeMovie(id: number){
    this.store.dispatch(cartRemoveMovie({ itemId: id }));
  }

  clearCart(){
    this.store.dispatch(cartClear());
  }

  finishPurchase(){
    alert("Felicidades! Se realizó su compra");
  }
}
