/**
 * Formateo argentino:
 * - Miles con punto
 * - Decimales con coma
 * Helpers puros y testeables.
 */

/** Quita puntos, permite solo dígitos y UNA coma */
export const sanitize = (s: string) => {
  const noDots = (s ?? '').replace(/\./g, '');
  const only = noDots.replace(/[^0-9,]/g, '');
  const parts = only.split(',');
  return parts.length > 2 ? `${parts[0]},${parts.slice(1).join('')}` : only;
};

/** Agrupa miles con punto en la parte entera */
export const groupThousands = (intPart: string) =>
  (intPart ?? '').replace(/\B(?=(\d{3})+(?!\d))/g, '.');

/**
 * Formato para input editable:
 * - Respeta coma al final si el usuario la acaba de escribir
 * - Agrupa miles solo si la parte entera > 0 (p/ no hacer "0,12" -> "0,12")
 * - Limita decimales a maxDecimals
 */
export const formatEditable = (raw: string, maxDecimals = 8) => {
  const endsWithComma = (raw ?? '').endsWith(',');
  const s = sanitize(raw ?? '');
  const [intRaw, decRaw = ''] = s.split(',');

  const intHasValue = intRaw && Number(intRaw) > 0;
  const intVisible = intHasValue ? groupThousands(intRaw) : intRaw;

  const decVisible = decRaw.slice(0, maxDecimals);
  if (endsWithComma) return `${intVisible},`;
  return decRaw ? `${intVisible},${decVisible}` : intVisible;
};

/**
 * Formato de solo lectura (fiat):
 * - Fija cantidad de decimales (default 2)
 * - Miles con punto, coma como decimal
 */
export const formatReadOnly = (raw: string, decimals = 2) => {
  const s = sanitize(raw ?? '');
  if (!s) return '';
  const [intRaw, decRaw = ''] = s.split(',');
  const n = Number(`${intRaw}.${decRaw}`);
  if (isNaN(n)) return '';
  const fixed = n.toFixed(decimals);
  const [i2, d2] = fixed.split('.');
  return `${groupThousands(i2)}${decimals ? `,${d2}` : ''}`;
};

/**
 * Formato de solo lectura (crypto):
 * - Hasta maxDecimals (default 8), recortando ceros a la derecha
 */
export const formatReadOnlyCrypto = (raw: string, maxDecimals = 8) => {
  const s = sanitize(raw ?? '');
  if (!s) return '';
  const [intRaw, decRaw = ''] = s.split(',');
  const n = Number(`${intRaw}.${decRaw}`);
  if (isNaN(n)) return '';
  const fixed = n.toFixed(maxDecimals);
  const [i2, d2] = fixed.split('.');
  const trimmed = (d2 ?? '').replace(/0+$/, '');
  return trimmed ? `${groupThousands(i2)},${trimmed}` : groupThousands(i2);
};
