import { Action, createReducer, on } from "@ngrx/store";
import { cartAddMovie, cartClear, cartRemoveMovie } from "./cart.actions";
import { CartState } from "./cart.state.model";

export const appInitialState: CartState = { items: [], total: 0 };

const _cartReducer = createReducer(
  appInitialState,
  on(cartAddMovie, (state, { item }) => {
    const items = [...state.items];
    items.push(item);
    let total = state.total + 500;
    return { ...state, items, total };
  }),

  on(cartRemoveMovie, (state, { itemId }) => {
    const items = [...state.items];
    const itemIndex = items.findIndex( i => i.id == itemId );
    items.splice(itemIndex, 1);
    let total = state.total - 500;
    return { ...state, items, total };
  }),

  on(cartClear, (state) => {
    return { ...state, items: [], total: 0 };
  })

);

export function cartReducer(state: any, action: Action){
  return _cartReducer(state, action);
}
