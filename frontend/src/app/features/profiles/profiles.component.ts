import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccessibilityService } from '../../core/services/accessibility.service';

import { ProfileService } from '../../core/services/profile.service';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { HeaderComponent } from '../../shared/header/header.component';
import { ButtonComponent } from '../../shared/button/button.component';
import { Button } from '../../shared/models/button.model';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

const DEFAULT_PROFILES = [
  {
    icon: 'text_format',
    title: 'Prefiro textos maiores e mais contraste',
    description:
      'O sistema ajusta o tamanho da fonte e o contraste automaticamente',
  },
  {
    icon: 'mood',
    title: 'Prefiro uma interface mais simples',
    description: 'Menos informações na tela e sem animações',
  },
  {
    icon: 'keyboard',
    title: 'Prefiro navegar pelo teclado',
    description: 'Foco sempre visível e atalhos de navegação',
  },
  {
    icon: 'volume_up',
    title: 'Prefiro ver o áudio como texto',
    description: 'Legendas automáticas e alertas visuais',
  },
  {
    icon: 'settings',
    title: 'Prefiro configurar tudo manualmente',
    description: 'Escolha cada opção de acessibilidade separadamente',
  },
];

@Component({
  selector: 'app-profiles',
  standalone: true,
  imports: [
    CommonModule,
    ProgressSpinnerModule,
    HeaderComponent,
    ButtonComponent,
  ],
  templateUrl: './profiles.component.html',
  styleUrl: './profiles.component.scss',
})
export class ProfilesComponent {
  accessibilityService = inject(AccessibilityService);
  route = inject(Router);
  profileService = inject(ProfileService);
  profiles = signal<Button[]>(DEFAULT_PROFILES);
  selectedProfile = signal<Button | null>(null);
  authService = inject(AuthService);

  onProfileSelect(profile: Button) {
    if (this.selectedProfile()?.title === profile.title) {
      this.selectedProfile.set(null);
    } else {
      this.selectedProfile.set(profile);
    }
  }

  confirmProfile() {
    if (!this.selectedProfile()) {
      alert('Selecione um perfil');
    } else {
      if (this.selectedProfile()?.icon == 'settings') {
        this.route.navigate(['/adjusts']);
      } else {
        alert('Perfil em desenvolvimento.');
      }
    }
  }

  clearSelection() {
    this.accessibilityService.updateConfig({ enabled: false });
  }

  logout() {
    this.authService.logout();
  }
}
