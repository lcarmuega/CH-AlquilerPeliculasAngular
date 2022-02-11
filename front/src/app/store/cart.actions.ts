import { createAction, props } from "@ngrx/store";
import { Movie } from "../models/movie.model";

export const cartAddMovie = createAction(
  'Cart - Add movie',
  props<{ item: Movie }>()
);

export const cartRemoveMovie = createAction(
  'Cart - Remove movie',
  props<{ itemId: number }>()
);

export const cartClear = createAction(
  'Cart - Clear all '
);
