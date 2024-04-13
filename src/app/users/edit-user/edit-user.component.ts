import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

  constructor(private usersService: UsersService, private actiivatedRouter: ActivatedRoute, private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    const id = parseInt(this.actiivatedRouter.snapshot.params?.['id'])
    this.usersService.getUserById(id).subscribe(user => {
      this.user = user
      this.editForm = this.fb.group({
        firstName: [user?.firstName, Validators.required],
        lastName: [user?.lastName, Validators.required],
        username: [user?.username, Validators.required],
        password: [
          '',
          Validators.compose([Validators.minLength(6)]),
        ],
        confirmPassword: [
          '', 
          Validators.compose([Validators.minLength(6)]),
        ]
      });
    })
  }
editForm!: FormGroup
user!: User | undefined
onSubmit() {
const isUpdate = confirm('sua khong')
if(isUpdate){
  const value = this.editForm.value
  if(value.password === value.confirmPassword){
    const newUser: User = {
      id: this.user?.id,
      firstName: value.firstName,
      lastName: value.lastName,
      username: value.username,
      password: value.password === '' ? this.user?.password : value.password
    }
    this.usersService.updateUser(newUser)
    alert('sua thanh cong')
    this.router.navigate(['/users']);
  }
  else {
    alert('mk k khop')
  }
}
}
}
