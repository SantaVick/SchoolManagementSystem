import { Component, inject, OnInit, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AdminService, AdminStats } from '../login/auth/admin.service';
import { AuthService, UserDto } from '../login/auth/auth.service';


@Component({
  selector: 'app-dashboard',
  imports: [RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {

  private authService = inject(AuthService);
  private adminService = inject(AdminService);
  private router = inject(Router);

  user = signal<UserDto | null>(null);

  stats = signal<AdminStats>({
    students: 0,
    teachers: 0,
    parents: 0,
    classes: 0
  });

  loading = signal(true);
  errorMessage = signal('');

  ngOnInit(): void {

    this.loadUser();
    this.loadStats();

  }

  private loadUser(): void {

    this.authService.getCurrentUser().subscribe({

      next: (user) => {

        this.user.set(user);

      },

      error: (error) => {

        console.error(
          'Failed to load current user:',
          error
        );

        this.logout();

      }

    });

  }

  private loadStats(): void {

    this.adminService.getStats().subscribe({

      next: (stats) => {

        console.log(
          'ADMIN STATS:',
          stats
        );

        this.stats.set(stats);

        this.loading.set(false);

      },

      error: (error) => {

        console.error(
          'Failed to load admin statistics:',
          error
        );

        this.errorMessage.set(
          'Unable to load dashboard statistics.'
        );

        this.loading.set(false);

      }

    });

  }

  logout(): void {

    this.authService.logout();

    this.router.navigate(['/login']);

  }
}