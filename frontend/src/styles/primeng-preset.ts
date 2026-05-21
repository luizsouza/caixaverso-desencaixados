import { definePreset } from '@primeng/themes';
import Aura from '@primeng/themes/aura';

export const HackathonPreset = definePreset(Aura, {
  semantic: {
    primary: {
      50: '#eff6ff',
      100: 'var(--color-primary-light)',
      200: '#bfdbfe',
      300: '#93c5fd',
      400: '#60a5fa',
      500: 'var(--color-primary)',
      600: '#1d4ed8',
      700: '#1e40af',
      800: '#1e3a8a',
      900: '#172554',
      950: '#0b1229',
    },
    colorScheme: {
      light: {
        surface: {
          0: 'var(--color-surface)',
          50: 'var(--color-surface-raised)',
          100: '#f1f5f9',
          200: 'var(--color-border)',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: 'var(--color-text-muted)',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: 'var(--color-text)',
          950: '#020617',
        },
      },
    },
  },
});
