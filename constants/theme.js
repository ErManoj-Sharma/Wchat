import { useColorScheme } from 'react-native';

export const COLORS = {
  primary: '#1DAA61',
  primaryDark: '#008068',
  danger: '#EF4444',
  success: '#22C55E',
};

export const lightColors = {
  ...COLORS,
  background: '#F8FAFC',
  surface: '#FFFFFF',
  card: '#FFFFFF',
  text: '#0F172A',
  secondaryText: '#64748B',
  border: '#E5E7EB',
  outline: '#E5E7EB',
  inputBackground: '#FFFFFF',
  onSurfaceVariant: '#64748B',
  skeleton: '#E5E7EB',
  avatarBg: '#ECECEC',
  avatarIcon: '#6B7280',
  toastBg: '#1F2937',
  svgStroke: '#E5E7EB',
  shadow: '#000',
};

export const darkColors = {
  ...COLORS,
  background: '#161717',
  surface: '#1E293B',
  card: '#161717',
  skeleton: '#1E293B',
  text: '#F9FAFB',
  subtext: '#94A3B8',
  secondaryText: '#94A3B8',
  border: '#334155',
  outline: '#334155',
  inputBackground: '#111827',
  onSurfaceVariant: '#94A3B8',
  avatarBg: '#242626',
  avatarIcon: '#CBD5E1',
  toastBg: '#020617',
  svgStroke: '#334155',
  shadow: '#000',
};

export function useAppTheme({ isDark: forcedIsDark } = {}) {
  const systemColorScheme = useColorScheme();
  const isDark = forcedIsDark ?? systemColorScheme === 'dark';
  return { isDark, colors: isDark ? darkColors : lightColors };
}
