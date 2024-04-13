import { User } from '../models/user';
import { LocalStorageService } from './local-storage.service';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private static readonly UsersStorageKey = 'users';

  private users: User[] = [];

  private usersSubject: BehaviorSubject<User[]> = new BehaviorSubject<User[]>(
    []
  );

  users$: Observable<User[]> = this.usersSubject.asObservable();

  constructor(private localStorageService: LocalStorageService) {}

  fetchDataFromLocalStorage() {
    this.users =
      this.localStorageService.getValue<User[]>(UsersService.UsersStorageKey) ||
      [];
    this.updateData();
  }
  private updateData() {
    this.usersSubject.next(this.users);
  }

  updateToLocalStorage() {
    this.localStorageService.setObject(
      UsersService.UsersStorageKey,
      this.users
    );
    this.updateData();
  }

  addUser(user: User): void {
    const isHasUser = this.users.find((u) => u.username === user.username);
    if (isHasUser) {
      alert('username is exciting');
      return;
    }
    const newUser = user;
    newUser.id = new Date(Date.now()).getTime();
    this.users.unshift(newUser);
    this.updateToLocalStorage();
  }

  deleteUser(id: number | undefined) {
    const idx = this.users.findIndex((u) => u.id === id);
    this.users.splice(idx, 1);
    this.updateToLocalStorage();
  }

  getUserById(id: number): Observable<User | undefined> {
    return of(this.users.find(u => u.id === id))
  }

  updateUser(user: User){
    const idx = this.users.findIndex(u => u.id === user.id)
    this.users.splice(idx, 1, user)
    this.updateToLocalStorage()
  }
}
