export const color = {
  // base
  white: '#FFFFFF',
  black: '#000000',

  // brand / acentos
  brand: '#f65621ff',
  brandSoftBg: '#FFF3E0',
  brandSoftBg2: '#FFF3EA',
  brandTrackOn: '#FFE0B2',
  brandBorder: '#B95C00',
  brandCircle: '#f6562161',
  brandSolid: '#FF6600',

  // estados
  danger: '#FF3B30',
  success: '#00C853',

  // grises / azules grisáceos usados en textos
  grayThumbOff: '#f4f3f4',
  grayTrackOff: '#767577',
  blueGray600: '#607D8B',
  blueGray700: '#455A64',
  blueGray300: '#B0BEC5',

  blue300: '#007bffa6',

  transparent6: 'rgba(0,0,0,0.6)',

  // --- background / blobs ---
  bgGradStart: '#fdebddff',
  bgGradEnd: '#FFFFFF',
  bgBlob1: '#FF6600',
  bgBlob2: '#FF9966',
  bgBlob3: '#FFA726',
  bgBlurFallback: '#FFF7F0',

  // feedback suaves
  successSoft: '#b9ffce',
  dangerSoft: '#ffd6d6',
} as const;

export type ColorKey = keyof typeof color;
export default color;
