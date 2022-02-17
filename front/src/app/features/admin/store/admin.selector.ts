import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AdminState } from "./admin-store.model";

export const adminSelector = createFeatureSelector<AdminState>('admin');

export const adminUsersSelector  = createSelector(
  adminSelector,
  (state: AdminState) => state.users
);
