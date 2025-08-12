// ------ Sanitizar texto numérico ------
// Elimina puntos, deja solo dígitos y una coma decimal
export const sanitize = (s: string) => {
  const noDots = s.replace(/\./g, '');
  const only = noDots.replace(/[^0-9,]/g, '');
  const parts = only.split(',');
  return parts.length > 2 ? `${parts[0]},${parts.slice(1).join('')}` : only;
};

// Agrupa miles con punto
export const groupThousands = (intPart: string) =>
  intPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

// ------ BTC Editable ------
// Hasta 8 decimales, sin miles
export const sanitizeBTCText = (text: string) => {
  let clean = text.replace(/[^0-9.]/g, '');
  const parts = clean.split('.');
  if (parts.length > 2) {
    clean = parts[0] + '.' + parts.slice(1).join('');
  }
  if (clean.endsWith('.') && parts.length === 2 && parts[1] === '') {
    return clean;
  }
  const [int = '', dec = ''] = clean.split('.');
  const dec8 = dec.slice(0, 8);
  return dec.length ? `${int}.${dec8}` : int;
};

export const formatBTCEditable = (raw: string, maxDecimals = 8) => {
  const endsWithComma = raw.endsWith(',');
  const s = sanitize(raw);
  const [intRaw, decRaw = ''] = s.split(',');
  const intVisible =
    intRaw && Number(intRaw) > 0 ? groupThousands(intRaw) : intRaw;
  const decVisible = decRaw.slice(0, maxDecimals);
  if (endsWithComma) return `${intVisible},`;
  return decRaw ? `${intVisible},${decVisible}` : intVisible;
};

export const formatBTC = (val: number | null) => {
  if (val == null || isNaN(val)) return '';
  return val.toFixed(8).replace(/\.?0+$/, '');
};

// ------ ARS (fiat) ------
export const parseARS = (text: string): number | null => {
  if (!text) return null;
  const normalized = text.replace(/\./g, '').replace(',', '.');
  const n = Number(normalized);
  return Number.isFinite(n) ? n : null;
};

export const formatARS = (value: number | null, fractionDigits = 2) => {
  if (value == null || isNaN(value)) return '';
  return new Intl.NumberFormat('es-AR', {
    style: 'decimal',
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  }).format(value);
};

export const formatReadOnly = (raw: string, decimals = 2) => {
  const s = sanitize(raw);
  if (!s) return '';
  const [intRaw, decRaw = ''] = s.split(',');
  const n = Number(`${intRaw}.${decRaw}`);
  if (isNaN(n)) return '';
  const fixed = n.toFixed(decimals);
  const [i2, d2] = fixed.split('.');
  return `${groupThousands(i2)}${decimals ? `,${d2}` : ''}`;
};

export const formatReadOnlyCrypto = (raw: string, maxDecimals = 8) => {
  const s = sanitize(raw);
  if (!s) return '';
  const [intRaw, decRaw = ''] = s.split(',');
  const n = Number(`${intRaw}.${decRaw}`);
  if (isNaN(n)) return '';
  const fixed = n.toFixed(maxDecimals);
  const [i2, d2] = fixed.split('.');
  const trimmed = d2.replace(/0+$/, '');
  return trimmed ? `${groupThousands(i2)},${trimmed}` : groupThousands(i2);
};
