import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, switchMap } from "rxjs";
import { User } from "src/app/models/user.model";
import { AdminService } from "../services/admin.service";
import { adminModifyUser, adminSetUsers } from "./admin.actions";

@Injectable()

export class AdminEffects {

  constructor(
    private actions: Actions,
    private adminService: AdminService
  ) {}

  adminModifyUser$ = createEffect( () =>
    this.actions.pipe(
      ofType(adminModifyUser),
      switchMap( action => this.adminService.updateUser(action.user)),
      map( data => adminSetUsers({ users: data.users as User[] }) )
    )
  );

}
