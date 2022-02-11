import { Movie } from "../models/movie.model";

export interface CartState {
  items: Movie[];
  total: number;
}
