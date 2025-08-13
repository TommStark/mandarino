import i18n from '../../../i18n/i18n';

export const te = (key: string, opts?: Record<string, unknown>) =>
  String(i18n.t(`splash:${key}`, opts));
