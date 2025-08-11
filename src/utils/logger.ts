export const DEBUG_AUTH = __DEV__; // podés forzar true/false si querés

function ts() {
  const d = new Date();
  return d.toISOString().split('T')[1].replace('Z', '');
}

export function logAuth(...args: any[]) {
  if (!DEBUG_AUTH) return;
  // prefijo compacto para filtrar en consola
  // ej: [AUTH 12:34:56.789] mensaje...
  // @ts-ignore
  console.log('[AUTH', ts() + ']', ...args);
}

export function logErrorAuth(label: string, e: any) {
  if (!DEBUG_AUTH) return;
  const flat = {
    name: e?.name,
    message: e?.message,
    code: e?.code,
    stack: e?.stack,
    domain: e?.domain,
    userInfo: e?.userInfo,
    response: e?.response,
    description: e?.description,
  };
  console.log('[AUTH ERROR]', label, flat);
}
