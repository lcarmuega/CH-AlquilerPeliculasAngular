import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit, OnDestroy {

  error!: string;

  users: User[] = [];

  private subscription: Subscription | undefined;

  constructor(
    private router: Router,
    private adminService: AdminService
  ) {}

  ngOnInit(): void {
    this.subscription = this.adminService.getUsers().subscribe( users => {
      this.users = users;
    } );
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  navigateToUser(id: any){
    this.router.navigate(['usuarios', id]);
  }

}
