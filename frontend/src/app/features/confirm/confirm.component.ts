import { Component, inject } from '@angular/core';
import { HeaderComponent } from '../../shared/header/header.component';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-confirm',
  imports: [HeaderComponent],
  templateUrl: './confirm.component.html',
  styleUrl: './confirm.component.scss',
})
export class ConfirmComponent {
  router = inject(Router);
  authService = inject(AuthService);

  goBack() {
    this.router.navigate(['/profiles']);
  }
  logout() {
    this.authService.logout();
  }
  minimizarApp() {
    window.close();
  }
}
