import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ProfileService } from './profile.service';
import { Environments } from '../../environments/environments';
import { tap, switchMap } from 'rxjs';
import { AccessibilityService } from './accessibility.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private profileService = inject(ProfileService);
  private accessibilityService = inject(AccessibilityService);
  private API_URL = Environments.API_BASE_URL;

  private readonly AUTH_KEY = 'BoxAdapta';
  private readonly EMAIL_KEY = 'BoxAdapta_email';

  private readonly _isLoggedIn = signal<boolean>(this.checkInitialState());
  readonly isLoggedIn = this._isLoggedIn.asReadonly();

  private readonly _userEmail = signal<string | null>(
    localStorage.getItem('BoxAdapta_email'),
  );
  readonly userEmail = this._userEmail.asReadonly();

  constructor() {
    if (this._isLoggedIn()) {
      this.profileService.loadUserProfiles();
    }
  }

  private checkInitialState(): boolean {
    return !!localStorage.getItem(this.AUTH_KEY);
  }

  /**
   * Realiza a operação de login do usuário via API.
   */
  login(email: string, senha: string) {
    return this.http.post(`${this.API_URL}/auth/login`, { email, senha }).pipe(
      tap((res: any) => {
        const token = res?.token;
        if (token) {
          const resConfig = {
            fontSize: res.config?.tamanhoTexto,
            letterSpacing: res.config?.espacamento,
            highContrast: res.config?.contraste,
            invertColors: res.config?.aparencia,
            readingGuide: res.config?.guiaLeitura,
            focusHighlight: res.config?.navegTeclado,
          };
          localStorage.setItem(this.AUTH_KEY, token);
          this.accessibilityService.updateConfig(resConfig);
        }
        localStorage.setItem(this.EMAIL_KEY, email);
        this._userEmail.set(email);
        this.accessibilityService.setUserEmail(email);
        this._isLoggedIn.set(true);
        this.profileService.loadUserProfiles();
      }),
    );
  }

  logout(): void {
    localStorage.removeItem(this.AUTH_KEY);
    localStorage.removeItem(this.EMAIL_KEY);
    this._isLoggedIn.set(false);
    this._userEmail.set(null);
    this.accessibilityService.updateConfig({ enabled: false });
    this.accessibilityService.clearConfig();
    this.profileService.clearProfiles();
    this.router.navigate(['/login']);
  }
}
