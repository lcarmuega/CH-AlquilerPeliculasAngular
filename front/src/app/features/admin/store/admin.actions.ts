import { createAction, props } from "@ngrx/store";
import { User } from "src/app/models/user.model";

export const adminModifyUser = createAction(
  'Admin - Modify User',
  props<{ user: User }>()
);

export const adminSetUsers = createAction(
  'Admin - Set Users',
  props<{ users: User[] }>()
);

