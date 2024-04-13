import { UsersService } from './services/users.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'angularCRUD';

  constructor(private usersService: UsersService){}

  ngOnInit(): void {
    this.usersService.fetchDataFromLocalStorage()
  }
  
}
