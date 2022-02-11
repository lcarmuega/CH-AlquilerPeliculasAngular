import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CartState } from "./cart.state.model";


export const cartStateSelector = createFeatureSelector<CartState>('cart');

export const cartItemsSelector = createSelector(
  cartStateSelector,
  (state: CartState) => state.items
);

export const cartTotalSelector = createSelector(
  cartStateSelector,
  (state: CartState) => state.total
)
