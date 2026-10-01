import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-users',
  imports: [FormsModule, RouterLink],
  templateUrl: './users.html',
  styleUrl: './users.css',
})
export class Users {

  showAddUser = false;

  newUser = {
    firstName: '',
    lastName: '',
    email: '',
    role: 'STUDENT',
    password: ''
  };

  openAddUser(): void {
    this.showAddUser = true;
  }

  closeAddUser(): void {
    this.showAddUser = false;
  }

  createUser(): void {
    console.log('New user:', this.newUser);
  }
}