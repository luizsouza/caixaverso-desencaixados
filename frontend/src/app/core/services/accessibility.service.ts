import { Injectable, signal, inject, effect } from '@angular/core';
import {
  AccessibilityConfig,
  AccessibilityConfigResponse,
  DEFAULT_CONFIG,
} from '../../shared/models/accessibility-config.model';
import { StorageService } from './storage.service';
import { HttpClient } from '@angular/common/http';
import { Environments } from '../../environments/environments';
import { Observable } from 'rxjs';

declare var chrome: any;

const CONFIG_KEY = 'accessiflow_config';

@Injectable({
  providedIn: 'root',
})
export class AccessibilityService {
  private storageService = inject(StorageService);
  private http = inject(HttpClient);
  private API_URL = Environments.API_BASE_URL;

  private readonly _userEmail = signal<string | null>(
    localStorage.getItem('BoxAdapta_email'),
  );

  readonly config = signal<AccessibilityConfig>(DEFAULT_CONFIG);
  readonly enabled = signal<boolean>(false);

  constructor() {
    this.loadConfig();

    effect(() => {
      this.enabled.set(this.config().enabled);
    });
  }

  private async loadConfig(): Promise<void> {
    const saved =
      await this.storageService.load<AccessibilityConfig>(CONFIG_KEY);
    if (saved) {
      this.config.set({ ...DEFAULT_CONFIG, ...saved });
    }
  }

  /** Define o email do usuário autenticado */
  setUserEmail(email: string | null): void {
    this._userEmail.set(email);
  }

  /** Atualiza a configuração localmente (signal + storage + aba ativa) */
  updateConfig(partial: Partial<AccessibilityConfig>): void {
    this.config.update((current) => ({ ...current, ...partial }));
    this.saveAndApply();
  }

  /** Envia as preferências atuais para o backend */
  savePreferences(): Observable<unknown> {
    const cfg = this.config();
    const payload = {
      email: this._userEmail() ?? '',
      tamanhoTexto: cfg.fontSize,
      contraste: cfg.highContrast,
      aparencia: cfg.invertColors,
      espacamento: cfg.letterSpacing,
      guiaLeitura: cfg.readingGuide,
      navegTeclado: cfg.focusHighlight,
    };
    return this.http.put(`${this.API_URL}/perfis`, payload);
  }

  resetConfig(): void {
    this.config.set(DEFAULT_CONFIG);
    this.saveAndApply();
  }

  /** Limpa todas as configurações persistidas (usado no logout) */
  clearConfig(): void {
    this.config.set(DEFAULT_CONFIG);
    this._userEmail.set(null);
    this.storageService.save(CONFIG_KEY, null);
    this.applyToActiveTab();
  }

  private async saveAndApply(): Promise<void> {
    await this.storageService.save(CONFIG_KEY, this.config());
    this.applyToActiveTab();
  }

  private applyToActiveTab(): void {
    if (typeof chrome !== 'undefined' && chrome.tabs) {
      chrome.tabs.query(
        { active: true, currentWindow: true },
        ([tab]: any[]) => {
          if (tab?.id) {
            chrome.tabs
              .sendMessage(tab.id, {
                type: 'APPLY_CONFIG',
                payload: this.config(),
              })
              .catch(() => {});
          }
        },
      );
    }
  }
}
