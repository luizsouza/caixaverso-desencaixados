import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

declare var chrome: any;

/**
 * Serviço que faz requisições HTTP via background.js da extensão,
 * contornando restrições de CORS em contexto chrome-extension://.
 * Quando não está em contexto de extensão (ng serve), usa fetch diretamente.
 */
@Injectable({
  providedIn: 'root',
})
export class ExtensionHttpService {
  private get isExtension(): boolean {
    return typeof chrome !== 'undefined' && !!chrome.runtime?.sendMessage;
  }

  request<T = any>(
    url: string,
    method: string = 'GET',
    body?: unknown,
    headers?: Record<string, string>,
  ): Observable<T> {
    return new Observable<T>((subscriber) => {
      if (this.isExtension) {
        // Proxy via background.js (bypasses CORS)
        chrome.runtime.sendMessage(
          {
            type: 'HTTP_REQUEST',
            url,
            method,
            headers: headers || { 'Content-Type': 'application/json' },
            body,
          },
          (response: any) => {
            if (chrome.runtime.lastError) {
              subscriber.error({
                status: 0,
                message: chrome.runtime.lastError.message,
              });
              return;
            }

            if (response?.ok) {
              subscriber.next(response.data as T);
              subscriber.complete();
            } else {
              subscriber.error({
                status: response?.status || 0,
                message: `HTTP ${response?.status}`,
                error: response?.data || response?.error,
              });
            }
          },
        );
      } else {
        // Fallback: fetch direto (funciona no ng serve)
        const fetchOptions: RequestInit = {
          method,
          headers: headers || { 'Content-Type': 'application/json' },
        };
        if (body && method !== 'GET') {
          fetchOptions.body = JSON.stringify(body);
        }

        fetch(url, fetchOptions)
          .then(async (res) => {
            const data = await res.json().catch(() => null);
            if (res.ok) {
              subscriber.next(data as T);
              subscriber.complete();
            } else {
              subscriber.error({ status: res.status, message: `HTTP ${res.status}`, error: data });
            }
          })
          .catch((err) => {
            subscriber.error({ status: 0, message: err.message });
          });
      }
    });
  }

  post<T = any>(url: string, body: unknown, headers?: Record<string, string>): Observable<T> {
    return this.request<T>(url, 'POST', body, headers);
  }

  put<T = any>(url: string, body: unknown, headers?: Record<string, string>): Observable<T> {
    return this.request<T>(url, 'PUT', body, headers);
  }

  get<T = any>(url: string, headers?: Record<string, string>): Observable<T> {
    return this.request<T>(url, 'GET', undefined, headers);
  }
}
