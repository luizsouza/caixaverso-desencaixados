import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AccessibilityService } from '../../core/services/accessibility.service';
import { AccessibilityConfig } from '../../shared/models/accessibility-config.model';
import { StepperModule } from 'primeng/stepper';
import { ButtonModule } from 'primeng/button';
import { HeaderComponent } from '../../shared/header/header.component';
import { SliderModule } from 'primeng/slider';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { SelectButtonModule } from 'primeng/selectbutton';
import { Router } from '@angular/router';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-customizer',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    StepperModule,
    ButtonModule,
    HeaderComponent,
    SliderModule,
    ToggleSwitchModule,
    SelectButtonModule,
    DialogModule,
    InputTextModule,
  ],
  templateUrl: './customizer.component.html',
  styleUrl: './customizer.component.scss',
})
export class CustomizerComponent {
  router = inject(Router);
  accessibilityService = inject(AccessibilityService);
  visible: boolean = true;

  ngOnInit(): void {
    this.accessibilityService.updateConfig({ enabled: true });
  }
  showDialog() {
    this.visible = true;
  }
  optionsContraste = [
    { label: 'Padrão', value: false },
    { label: 'Alto contraste', value: true },
  ];
  optionsTheme = [
    { label: 'Padrão', value: false },
    { label: 'Adaptada', value: true },
  ];
  get config(): AccessibilityConfig {
    return this.accessibilityService.config();
  }

  private updateTimeout: any;

  update(key: keyof AccessibilityConfig, value: any) {
    if (this.updateTimeout) {
      clearTimeout(this.updateTimeout);
    }
    this.updateTimeout = setTimeout(() => {
      this.accessibilityService.updateConfig({ [key]: value });
    }, 200);
  }
  salvarPreferencias() {
    this.accessibilityService.savePreferences().subscribe({
      next: () => this.router.navigate(['confirm']),
      error: (err) => console.error('Erro ao salvar preferências:', err),
    });
  }

  goBack() {
    this.router.navigate(['profiles']);
  }
}
