const kv = await Deno.openKv("./config.db.sqlite3");

const CONFIG_KEY = ["config", "registry-board"];

export type Config = {
  registryUrl: string;
};

export const resetConfig = async () => {
  await kv.delete(CONFIG_KEY);
};

export const loadConfig = async (): Promise<Config | undefined> => {
  const config = await kv.get<Config>(CONFIG_KEY);
  if (config.value) {
    return config.value;
  }

  return undefined;
};

export const saveConfig = async (config: Partial<Config>) => {
  const existingConfig = await loadConfig();
  const newConfig = { ...existingConfig, ...config };
  const result = await kv.atomic().set(CONFIG_KEY, newConfig).commit();
  return result.ok;
};

export const createRegistryUrl = (
  registryUrl: string,
  pathname: string,
): string => {
  const path = pathname.startsWith("/") ? pathname.substring(1) : pathname;
  const url = `http://${registryUrl}/${path}`;

  if (isValidUrl(url)) {
    return url;
  } else {
    throw new Error(`Invalid URL created: ${url}`);
  }
};

export const isValidUrl = (possibleUrl: string): boolean => {
  try {
    new URL(possibleUrl);
    return true;
  } catch (_) {
    return false;
  }
};
