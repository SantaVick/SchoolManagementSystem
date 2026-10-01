import { Routes } from '@angular/router';
import { Login } from './components/login/login';
import { Dashboard } from './components/dashboard/dashboard';
import { authGuard } from './components/login/auth/auth.guard';
import { Users } from './components/users/users';
import { AddUser } from './components/users/add-user/add-user';


export const routes: Routes = [
  { path: '',                    component: Login },
  { path: 'login',            component: Login},
  { path: 'dashboard',        component: Dashboard, canActivate: [authGuard]},
  { path: 'users',        component: Users, canActivate: [authGuard]},
  { path: 'users/add',        component: AddUser, canActivate: [authGuard]},


];