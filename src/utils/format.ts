export const sanitize = (input: string) => {
  let s = input.replace(/[^\d,]/g, '');
  s = s.replace(/,+/g, ',');
  if (!s.includes(',')) {
    s = s.replace(/^0+(?=\d)/, '');
  } else {
    s = s.replace(/^0+(?=,)/, '0');
    if (s.startsWith(',')) s = '0' + s;
  }
  return s;
};

export const groupThousands = (intPart: string) =>
  intPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

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
