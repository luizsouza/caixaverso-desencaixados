import { Injectable } from '@angular/core';
import { AccessibilityConfig } from '../../shared/models/accessibility-config.model';

declare var chrome: any;

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor() { }

  private get isExtension(): boolean {
    return typeof chrome !== 'undefined' && !!chrome.storage;
  }

  async save(key: string, value: unknown): Promise<void> {
    if (this.isExtension) {
      await chrome.storage.sync.set({ [key]: value });
    } else {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }

  async load<T>(key: string): Promise<T | null> {
    if (this.isExtension) {
      return new Promise<T | null>((resolve) => {
        chrome.storage.sync.get([key], (result: any) => {
          resolve((result[key] as T) || null);
        });
      });
    } else {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : null;
    }
  }

  async saveForDomain(domain: string, config: AccessibilityConfig): Promise<void> {
    const key = `domain_${domain}`;
    await this.save(key, config);
  }

  async loadForDomain(domain: string): Promise<AccessibilityConfig | null> {
    const key = `domain_${domain}`;
    return this.load<AccessibilityConfig>(key);
  }
}
