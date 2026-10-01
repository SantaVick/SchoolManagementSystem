import { Component, inject, signal } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  private fb = inject(FormBuilder);

  private authService = inject(AuthService);

  private router = inject(Router);

  showPassword = signal(false);

  loading = signal(false);

  errorMessage = signal('');

  form = this.fb.nonNullable.group({

    email: [
      '',
      [
        Validators.required,
        Validators.email
      ]
    ],

    password: [
      '',
      [
        Validators.required,
        Validators.minLength(8)
      ]
    ],

    remember: [false]

  });

  get email() {
    return this.form.controls.email;
  }

  get password() {
    return this.form.controls.password;
  }

  togglePassword(): void {

    this.showPassword.update(
      value => !value
    );

  }

  submit(): void {

    console.log('LOGIN BUTTON CLICKED');

    this.errorMessage.set('');

    if (this.form.invalid) {

      console.log('FORM INVALID');

      this.form.markAllAsTouched();

      return;
    }

    console.log('FORM VALID');

    this.loading.set(true);

    const {
      email,
      password,
      remember
    } = this.form.getRawValue();

    console.log(
      'Sending login request to backend...',
      email
    );

    this.authService.login({
      email,
      password
    }).subscribe({

      next: (response) => {

        console.log(
          'LOGIN SUCCESS:',
          response
        );

        if (remember) {

          localStorage.setItem(
            'auth_token',
            response.token
          );

        } else {

          sessionStorage.setItem(
            'auth_token',
            response.token
          );
        }

        localStorage.setItem(
          'current_user',
          JSON.stringify(response.user)
        );

        this.loading.set(false);

        this.router.navigate([
          '/dashboard'
        ]);
      },

      error: (error) => {

        console.error(
          'LOGIN ERROR:',
          error
        );

        this.loading.set(false);

        if (error.status === 401) {

          this.errorMessage.set(
            'Email or password is incorrect.'
          );

        } else if (error.status === 403) {

          this.errorMessage.set(
            "You don't have permission to access the system."
          );

        } else if (error.status === 0) {

          this.errorMessage.set(
            'Cannot connect to the backend server.'
          );

        } else {

          this.errorMessage.set(
            'Something went wrong. Please try again.'
          );
        }
      }

    });
  }
}