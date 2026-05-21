import { Component, inject, signal } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { HeaderComponent } from '../../shared/header/header.component';
import { FormGroup, ReactiveFormsModule, FormControl } from '@angular/forms';

@Component({
  selector: 'app-auth',
  imports: [
    InputTextModule,
    ButtonModule,
    HeaderComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
})
export class AuthComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  loginForm = new FormGroup({
    email: new FormControl<string>('', { nonNullable: true }),
    password: new FormControl<string>('', { nonNullable: true }),
  });

  isValid = signal(true);

  ngOnInit() {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['profiles']);
    }
  }

  login() {
    const email = this.loginForm.get('email')?.value;
    const password = this.loginForm.get('password')?.value;

    if (email && password) {
      this.authService.login(email, password).subscribe({
        next: () => {
          this.router.navigate(['profiles']);
        },
        error: (err) => {
          console.error('Login error:', err.status, err.message, err);
          this.isValid.set(false);
        },
      });
    }
  }
}
