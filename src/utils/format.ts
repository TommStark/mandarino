// src/utils/format.ts

// ------ BTC (superior) ------
// Solo dígitos y un punto (como decimal). Sin miles. Hasta 8 decimales.
export const sanitizeBTCText = (text: string) => {
  let clean = text.replace(/[^0-9.]/g, '');
  const parts = clean.split('.');
  if (parts.length > 2) {
    clean = parts[0] + '.' + parts.slice(1).join('');
  }

  // ⬇️ si el usuario escribió "0." (o "1.", etc), preservamos el punto para permitir seguir con decimales
  if (clean.endsWith('.') && parts.length === 2 && parts[1] === '') {
    return clean; // ej: "0."
  }

  const [int = '', dec = ''] = clean.split('.');
  const dec8 = dec.slice(0, 8);
  return dec.length ? `${int}.${dec8}` : int;
};

export const parseBTC = (text: string): number | null => {
  if (!text) return null;
  const n = Number(text);
  return Number.isFinite(n) ? n : null;
};

export const formatBTC = (val: number | null) => {
  if (val == null || isNaN(val)) return '';
  // mostramos con hasta 8 decimales, sin miles
  return val.toFixed(8).replace(/\.?0+$/, '');
};

// ------ ARS (inferior) ------
// es-AR: miles ".", decimales ","
export const formatARS = (value: number | null, fractionDigits = 2) => {
  if (value == null || isNaN(value)) return '';
  return new Intl.NumberFormat('es-AR', {
    style: 'decimal',
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  }).format(value);
};

export const parseARS = (text: string): number | null => {
  if (!text) return null;
  // quitamos puntos de miles y convertimos coma a punto
  const normalized = text.replace(/\./g, '').replace(',', '.');
  const n = Number(normalized);
  return Number.isFinite(n) ? n : null;
};
