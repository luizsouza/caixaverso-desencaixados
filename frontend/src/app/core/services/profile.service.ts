import { Injectable, signal } from '@angular/core';
import { AccessibilityConfig } from '../../shared/models/accessibility-config.model';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  profiles = signal<{ id: string; name: string; description: string; config: Partial<AccessibilityConfig> }[]>([]);
  isLoading = signal<boolean>(false);

  // Simula a requisição para o backend
  async loadUserProfiles(): Promise<void> {
    this.isLoading.set(true);
    
    // Simulando delay de rede
    await new Promise(resolve => setTimeout(resolve, 800));

    // Mock de dados mantendo os perfis antigos, mas agora como dados dinâmicos
    const mockProfiles = [
      {
        id: 'low-vision',
        name: 'Baixa Visão',
        description: 'Texto ampliado e alto contraste',
        config: {
          fontSize: 150,
          highContrast: true,
          focusHighlight: true,
        }
      },
      {
        id: 'colorblind',
        name: 'Daltonismo',
        description: 'Ajuste de cores e contraste',
        config: {
          highContrast: true,
          invertColors: true,
        }
      },
      {
        id: 'dyslexia',
        name: 'Dislexia',
        description: 'Fonte especial e guia de leitura',
        config: {
          letterSpacing: 0.1,
          readingGuide: true,
        }
      },
      {
        id: 'custom',
        name: 'Personalizado',
        description: 'Ajustes manuais detalhados',
        config: {}
      }
    ];

    this.profiles.set(mockProfiles);
    this.isLoading.set(false);
  }

  clearProfiles(): void {
    this.profiles.set([]);
  }
}
