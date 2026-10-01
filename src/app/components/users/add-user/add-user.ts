import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-user',
  imports: [RouterLink, FormsModule],
  templateUrl: './add-user.html',
  styleUrl: './add-user.css',
})
export class AddUser {

  newUser = {
    firstName: '',
    lastName: '',
    email: '',
    role: 'STUDENT',
    password: ''
  };

  createUser(): void {
    console.log('User to create:', this.newUser);
  }
}