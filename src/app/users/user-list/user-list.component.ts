import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  users: User[] = [];

  constructor(private usersServices: UsersService) {}

  ngOnInit(): void {
    this.usersServices.users$.subscribe((users) => (this.users = users));
  }


  deleteUser(id: number | undefined) {
    const isDelete = confirm('xoa khong');
    if(isDelete) {

      this.usersServices.deleteUser(id);
    }
  }
}
