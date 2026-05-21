import { Component, computed, inject, input, signal } from '@angular/core';
import { AccessibilityService } from '../../core/services/accessibility.service';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { FormsModule } from '@angular/forms';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [ToggleButtonModule, FormsModule, ToggleSwitchModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  subtitle = input('');
  description = input('');
  router = inject(Router);
  actualRoute = signal('');
  private accessibilityService = inject(AccessibilityService);
  checked = computed(() => this.accessibilityService.config().enabled);

  ngOnInit(): void {
    this.actualRoute.set(this.router.url);
  }
  toggleEnabled(value: boolean) {
    this.accessibilityService.updateConfig({ enabled: value });
  }

  minimizarApp() {
    window.close();
  }
}
