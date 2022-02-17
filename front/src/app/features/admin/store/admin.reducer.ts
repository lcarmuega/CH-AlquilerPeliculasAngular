import { Action, createReducer, on } from "@ngrx/store";
import { AdminState } from "./admin-store.model";
import { adminSetUsers } from "./admin.actions";

export const appInitialState: AdminState = { users: [] };

const _adminReducer = createReducer(
  appInitialState,

  on(adminSetUsers, (state, { users }) => {
    return { ...state, users };
  })
);

export function adminReducer(state: any, action: Action) {
  return _adminReducer(state, action);
}
