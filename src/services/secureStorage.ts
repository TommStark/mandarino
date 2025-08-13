import * as Keychain from 'react-native-keychain';

type KeychainOptions = NonNullable<
  Parameters<typeof Keychain.setGenericPassword>[2]
>;

const baseOpts: KeychainOptions = {
  accessible: (Keychain as any).ACCESSIBLE?.ALWAYS_THIS_DEVICE_ONLY,
  securityLevel: (Keychain as any).SECURITY_LEVEL?.SECURE_SOFTWARE,
};

const serviceOf = (k: string) => ({ service: `mandarino.${k}` });

export async function setSecret(key: string, value: string) {
  await Keychain.setGenericPassword(key, value, {
    ...baseOpts,
    ...serviceOf(key),
  });
}

export async function getSecret(key: string): Promise<string | null> {
  const creds = await Keychain.getGenericPassword({ ...serviceOf(key) } as any);
  if (!creds) return null;
  return (creds as any).password ?? null;
}

export async function deleteSecret(key: string) {
  await Keychain.resetGenericPassword({ ...serviceOf(key) } as any);
}

export async function setJSON(key: string, obj: unknown) {
  await setSecret(key, JSON.stringify(obj));
}

export async function getJSON<T = unknown>(key: string): Promise<T | null> {
  const raw = await getSecret(key);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}
