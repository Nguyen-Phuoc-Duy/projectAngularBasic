import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs';
import { User } from 'src/app/models/user';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss'],
})
export class AddUserComponent implements OnInit {
  constructor(private fb: FormBuilder, private usersService: UsersService) {}

  ngOnInit(): void {
    this.addForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      password: [
        '',
        Validators.compose([Validators.required, Validators.minLength(6)]),
      ],
      confirmPassword: [
        '', 
        Validators.compose([Validators.required, Validators.minLength(6)]),
      ]
    });
  }

  onSubmit() {
    const value = this.addForm.value;
    if (value.password !== value.confirmPassword) {
      alert('mk k khop');
      return;
    }
    const newUser: User = {
      firstName: value.firstName,
      lastName: value.lastName,
      username: value.username,
      password: value.password,
    };
    this.usersService.addUser(newUser);
    this.addForm.reset()
    alert('add thanh cong')
  }

  addForm!: FormGroup;
}
