// Exporteer veelgebruikte stijl-constanten en bestaande modules zodat `import { COLORS, SPACING } from '../styling'` werkt.

export { theme } from './theme';
export { commonStyles } from './commonstyles';

export const COLORS = {
  primary: '#1a1a2e',
  secondary: '#16213e',
  accent: '#e94560',
  background: '#0f3460',
  text: '#ffffff',
  textSecondary: '#cccccc',
  border: '#444444',
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};