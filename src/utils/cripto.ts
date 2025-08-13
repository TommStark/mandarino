export const truncate = (txt: string, max = 18) =>
  !txt ? '' : txt.length > max ? `${txt.slice(0, max - 1)}…` : txt;

export const isNum = (v: number | null | undefined): v is number =>
  typeof v === 'number' && isFinite(v);

export const formatPrice = (v: number | null | undefined) => {
  if (!isNum(v)) return '--';
  if (Math.abs(v) >= 100000) {
    return new Intl.NumberFormat('es-AR', {
      notation: 'compact',
      maximumFractionDigits: 2,
    }).format(v);
  }
  const below1 = Math.abs(v) < 1;
  return v.toLocaleString('es-AR', {
    minimumFractionDigits: below1 ? 4 : 2,
    maximumFractionDigits: below1 ? 6 : 2,
  });
};

export const formatPercent = (v: number | null | undefined) => {
  if (!isNum(v)) return '—';
  const arrow = v >= 0 ? '▲' : '▼';
  return `${arrow} ${Math.abs(v).toFixed(2)}%`;
};

export const formatAmount = (v: number | undefined) => {
  if (!isNum(v)) return '•••••••';
  if (Math.abs(v) >= 100000) {
    return new Intl.NumberFormat('es-AR', {
      notation: 'compact',
      maximumFractionDigits: 2,
    }).format(v);
  }
  const below1 = Math.abs(v) < 1;
  return v.toLocaleString('es-AR', {
    minimumFractionDigits: below1 ? 4 : 2,
    maximumFractionDigits: below1 ? 6 : 4,
  });
};
