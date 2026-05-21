export interface AccessibilityConfig {
  enabled: boolean;

  // Tipografia
  fontSize: number;
  letterSpacing: number;

  // Cores
  highContrast: boolean;
  invertColors: boolean;

  // Leitura
  readingGuide: boolean;
  focusHighlight: boolean;
}

export interface AccessibilityConfigResponse {
  tamanhoTexto: number;
  espacamento: number;
  contraste: boolean;
  aparencia: boolean;
  guiaLeitura: boolean;
  navegTeclado: boolean;
}

export const DEFAULT_CONFIG: AccessibilityConfig = {
  enabled: false,
  fontSize: 100,
  letterSpacing: 0,
  highContrast: false,
  invertColors: false,
  readingGuide: false,
  focusHighlight: false,
};
