import fs from 'fs/promises';

export const importJson = async <T extends Record<string, unknown>>(
  path: string
): Promise<T> => {
  const fileContent = (await fs.readFile(path)).toString();
  return JSON.parse(fileContent);
};
